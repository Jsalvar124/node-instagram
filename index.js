require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise')
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const CronJob = require("cron").CronJob;
const images = require('./images.js')
console.log(images[0])

//Server
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}, http://localhost:4000`)
})

app.get('/', (req, res)=>{
    res.json({
            greeting: "Welcome to Las Escriturras Server",
            images
        }
    )
})

//Post from local files
const postToInstagramLocal = async (n) => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const path = `./img/quote${n}.jpg`;
    const publishResult = await ig.publish.photo({
        // read the file into a Buffer
        file: await readFileAsync(path),
        // optional, default ''
        // caption: 'Local Image Post',
    })
    console.log(publishResult);
}

const postToInstagramDeployed = async (id) => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    const connectionResult = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    console.log(connectionResult)
    console.log('image to post ' + images[id])
    const imageBuffer = await get({
        url: images[id],
        encoding: null, 
    });

    const publishResult = await ig.publish.photo({
        file: imageBuffer,
        caption: 'Cronjob from vercel server',
    });

    console.log(publishResult)
}
// postToInstagramLocal(index)

let  index = 1
const cronInsta = new CronJob("30 20 * * */7", async () => {
    postToInstagramDeployed(index); 
    index+=1;
});

cronInsta.start();
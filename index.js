//Server
const express = require('express');
const cors = require('cors');
const handler = require('./cronjob.js');
const images = require('./images.js')
const app = express()
const port = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}, http://localhost:${port}`)
})

app.get('/', (req, res)=>{
    res.json({
            greeting: "Welcome to Las Escriturras Server",
            images
        }
    )
})

//Post from local files
// const postToInstagramLocal = async (n) => {
//     const ig = new IgApiClient();
//     ig.state.generateDevice(process.env.IG_USERNAME);
//     await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

//     const path = `./img/quote${n}.jpg`;
//     const publishResult = await ig.publish.photo({
//         // read the file into a Buffer
//         file: await readFileAsync(path),
//         // optional, default ''
//         // caption: 'Local Image Post',
//     })
//     console.log(publishResult);
// }

// let  index = 0
app.get('/api/cron', async (req, res)=>{
    try {
        console.log('cronjob ---')
        await handler();
        res.status(200).send('Cron job completed');
    } catch (error) {
        console.log(error)
        res.status(500).send('Cron job error');
    }
})
// postToInstagramLocal(index)

// let  index = 0
// const cronInsta = new CronJob("*/30 * * * *", async () => {
//     if (index < images.length) {
//         postToInstagramDeployed(index);
//         index += 1;
//       } else {
//         cronInsta.stop(); // Stop the cron job if all images have been uploaded.
//       }
// });

// cronInsta.start();

// https://chachoapa124.imgur.com/all/

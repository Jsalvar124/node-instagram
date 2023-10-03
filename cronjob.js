require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise')
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const images = require('./images.js')
// 


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
        // caption: 'Cronjob from vercel server',
    });

    console.log(publishResult)
    return(publishResult)
}
let index = 0;
const handler = async (req, res) => {
  try {
    console.log('Cron job started');
    console.log('Cron job executed at', new Date());
    // Call your Instagram posting function here
    const response = await postToInstagramDeployed(index); 
    console.log(response);
    index += 1;
  } catch (error) {
    console.error('Cron job error:', error);
  }
};

module.exports = handler
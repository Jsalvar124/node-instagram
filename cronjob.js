require('dotenv').config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise')
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const images = require('./images.js')

// post to instagram function
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

//function get current index from json
const getCurrentIndex = async ()=>{
  try {
    const jsonData = await readFileAsync('./currentIndex.json', 'utf8');
    const { currentIndex } = JSON.parse(jsonData);
    return currentIndex;
  } catch (error) {
    console.log(error)
    return 0; // default index 0.
  }
}  

// Function to update the index in the JSON file
const updateIndex = async (newIndex) => {
  const data = JSON.stringify({ currentIndex: newIndex });
  await writeFileAsync('./currentIndex.json', data, 'utf8');
};

//main function called on endpoint /api/cron
const handler = async (req, res) => {
  try {
    console.log('Cron job started');
    //get index from json file
    let index = await getCurrentIndex();
    //avoid posting unexisting image link.
    if (index >= images.length) {
      console.log('All images have been posted.');
      res.status(200).send('All images have been posted.');
      return;
    }
    //Instagram posting function here
    const response = await postToInstagramDeployed(index); 
    console.log('Cron job executed at', new Date());
    console.log(response);
    index += 1;
    //update json file with index for the next post.
    await updateIndex(index);
  } catch (error) {
    console.error('Cron job error:', error);
  }
};

// const testJsonWrite = async () =>{
//   let index = await getCurrentIndex();
//   console.log(`current index: ${index}`)
//   index += 1;
//   await updateIndex(index);
// }

// testJsonWrite();

module.exports = handler
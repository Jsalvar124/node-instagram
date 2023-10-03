const cron = require('node-cron');
const { postToInstagramDeployed } = require('./index.js'); // Import your Instagram posting functions

// Schedule the cron job to run at a specific time
let  index = 0
cron.schedule('0 20 * * *', () => {
  try {
    console.log('Cron job started');
    console.log('Cron job executed at', new Date())
    // Call your Instagram posting function here
    postToInstagramDeployed(index);
    console.log('Cron job completed');
    index+=1;
  } catch (error) {
    console.error('Cron job error:', error);
  }
});
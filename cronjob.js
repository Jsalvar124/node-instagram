const { postToInstagramDeployed } = require('./index.js'); // Import your Instagram posting function

module.exports = async (req, res) => {
  try {
    console.log('Cron job started');
    console.log('Cron job executed at', new Date());
    // Call your Instagram posting function here
    await postToInstagramDeployed(index); // Make sure to handle any necessary asynchronous operations
    console.log('Cron job completed');
    index += 1;
    res.status(200).send('Cron job completed');
  } catch (error) {
    console.error('Cron job error:', error);
    res.status(500).send('Cron job error');
  }
};
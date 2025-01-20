const fetch = require('node-fetch'); // Make sure to have node-fetch installed

module.exports = {
  name: "meow",
  description: "meow",
  async execute(message) {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      const catUrl = data[0].url; // Extracting the URL of the cat image
      message.channel.send(catUrl);
    } catch (error) {
      console.error("Error fetching cat image:", error);
      message.channel.send("Sorry, I couldn't fetch a cat image at the moment. 😿");
    }
  },
};

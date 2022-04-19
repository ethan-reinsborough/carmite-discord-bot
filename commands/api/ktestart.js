const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ktestart",
    description: "Testing art retrieval from Karuta!",
    async execute(message) {
        message.channel.fetchMessages({limit: 2})
        .then(messageMappings => {
        let messages = Array.from(messageMappings.values());
        let previousMessage = messages[1];
        message.channel.send(previousMessage);
        // do something with previous message
        const receivedEmbed = previousMessage.embeds[0];
        message.channel.send(receivedEmbed);
        })
    },
  };
  
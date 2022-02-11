  
  const { MessageEmbed } = require("discord.js");
  
  module.exports = {
    name: "la",
    description: "Is Lost Ark Up",
    async execute(message) {
        const embed = new MessageEmbed()
        .setAuthor(`Lost Ark Server Status: DOWN`)
        .setColor("#16b5ff")
        .setImage("https://imgur.com/gallery/IXSHw");
        message.channel.send(embed);
    },
  };
  
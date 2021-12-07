const Canvas = require('canvas');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "canvas",
    description: "Test",
    async execute(message) {
        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext('2d')    // Load the background image and draw it to the canvas
        const background = await Canvas.loadImage("https://i.imgur.com/ruMzelh.jpeg");
        let x = 0
        let y = 0
        ctx.drawImage(background, x, y)
        const embed = new MessageEmbed()
          .setAuthor("Test")
          .setImage(canvas.toBuffer())
          message.channel.send(embed);
    },
  };
  
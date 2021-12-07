const Canvas = require('canvas');
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "canvas",
    description: "Test",
    async execute(message) {
        const canvas = Canvas.createCanvas(700, 250)
        const context = canvas.getContext('2d')    // Load the background image and draw it to the canvas
        const background = await Canvas.loadImage("https://i.imgur.com/ruMzelh.jpeg");
        let x = 0
        let y = 0
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

	// Use the helpful Attachment class structure to process the file for you
	const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
  const embed = new MessageEmbed()
  .attachFiles(attachment)
  .setAuthor(`Test`)
  .setImage('attachment://profile-image.png')
  message.channel.send(embed);
	//message.channel.send({ files: [attachment] });
    },
  };
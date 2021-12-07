const Canvas = require('canvas');
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "canvas",
    description: "Test",
    async execute(message) {
        const canvas = Canvas.createCanvas(700, 300)
        const context = canvas.getContext('2d')    // Load the background image and draw it to the canvas
        const background = await Canvas.loadImage("https://i.imgur.com/ebv8tyw.png");
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, 140, 150);
        context.strokeRect(140, 0, 140, 150);
        context.strokeRect(280, 0, 140, 150);
        context.strokeRect(420, 0, 140, 150);
        context.strokeRect(560, 0, 140, 150);
        var zyra = await Canvas.loadImage("https://raw.communitydragon.org/pbe/game/assets/ux/tft/championsplashes/tft6_zyra_mobile.tft_set6.png");
        context.drawImage(zyra, 0, 0, 130, 140);
        context.drawImage(zyra, 140, 0, 130, 140);
        context.drawImage(zyra, 280, 0, 130, 140);
        context.drawImage(zyra, 420, 0, 130, 140);
        context.drawImage(zyra, 560, 0, 130, 140);
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
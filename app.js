"use strict";

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

var stringtest = `Hello I'm a test sentence`;
console.log(stringtest.substring(stringtest.indexOf("m") + 2));

client.login(process.env.BOT_TOKEN);

client.on("message", (msg) => {
  if (/I'm/.test(msg) == true || /i'm/.test(msg) == true || /im/.test(msg) == true) {
    var i = msg.content.substring(msg.content.indexOf("m") + 2);
    Discord.Message({content:"Hello"});
    msg.reply(`nice to meet you ${i}, I am Carmite Bot!`);
    message.channel.send(`nice to meet you ${i}, I am Carmite Bot!`);
  }
});

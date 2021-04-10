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
  if (/I'm/.test(msg) == true || /i'm/.test(msg) == true) {
    var i = msg.content.substring(msg.content.indexOf("I'm") + 4);
    msg.channel.send(`Nice to meet you ${i}, I am Carmite Bot!`);
  }
  if(/im/.test(msg) == true){
    var i = msg.content.substring(msg.content.indexOf("im") + 3);
    msg.channel.send(`Nice to meet you ${i}, I am Carmite Bot!`);
  }
  if(/pingcat/.test(msg) == true){
    msg.channel.send('<@!461140829889626123>');
  }
  if(msg.content === client.emojis.cache.find(emoji => emoji.name === 'christianserver')){
    msg.channel.send('<@!461140829889626123>');
  }
  if(/pingethan/.test(msg) == true){
    msg.channel.send('<@!180787488950976523>');
  }
});

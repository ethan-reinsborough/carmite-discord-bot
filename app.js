"use strict";

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

client.login(process.env.BOT_TOKEN);

client.on("message", (msg) => {
  if (/I'm/.test(msg) == true || /i'm/.test(msg) == true || /im/.test(msg) == true) {
    msg.reply(`nice to meet you ${msg.substring(msg.indexOf("m") + 2)}, I am Carmite Bot!`);
  }
});

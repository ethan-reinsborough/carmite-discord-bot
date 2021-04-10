"use strict";

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();
const regex = /I'm/;
const regex2 = /i'm/;
const regex3 = /im/;
const found = paragraph.match(regex);
client.on("ready", () => {
  console.log("Bot is ready");
});

client.login(process.env.BOT_TOKEN);

client.on("message", (msg) => {
  if (msg.match(regex) || msg.match(regex2) || msg.match(regex3)) {
    msg.reply("Nice to meet you, I'm Carmite Bot!");
  }
});

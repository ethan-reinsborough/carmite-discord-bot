"use strict";

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();
const regex = /I'm/;
const regex2 = /i'm/;
const regex3 = /im/;

client.on("ready", () => {
  console.log("Bot is ready");
});

client.login(process.env.BOT_TOKEN);

client.on("message", (msg) => {
  if (msg.test(regex) == true || msg.test(regex2) == true || msg.test(regex3) == true) {
    msg.reply("Nice to meet you, I'm Carmite Bot!");
  }
});

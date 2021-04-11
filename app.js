"use strict";

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

client.login(process.env.BOT_TOKEN);

client.on("message", (msg) => {
  //if (/.*\s(I|i)(:?'?m)\s/.test(msg) == true) {
    var i = msg.content.substring(msg.content.toLowerCase().indexOf("I'm") + 4);
    msg.channel.send(`Nice to meet you ${i}, I am Charles.`);
  }
  if(/pingcat/.test(msg) == true){
    msg.channel.send('<@!461140829889626123>');
  }
  if(msg.content.startsWith('<:christianserver:830284378180681798>')){
    msg.channel.send('<@!461140829889626123>');
  }
  if(/pingethan/.test(msg) == true){
    msg.channel.send('<@!180787488950976523>');
  }
});

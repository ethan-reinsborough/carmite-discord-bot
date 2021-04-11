"use strict";

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

client.login(process.env.BOT_TOKEN);

function dadJokeFactory(body) {
  let pattern = /(^|(.*\s))(I|i)(('?m)|( am))\s(?<name>.+)/;
  let match = body.match(pattern);
  if (match) {
      let name = match.groups["name"];
      return `Nice to meet you ${name}, I am Charles.`;
  }
}

function pingEthanFactory(body) {
  if (/pingethan/.test(body)) 
    return "<@!180787488950976523>";
}

function bugCatFactory(body) {
  if (body.startsWith("<:christianserver:830284378180681798>")) 
    return "<@!461140829889626123>";
}

function gamersFactory(body){
  if (body == "summon gamers") 
    return "<@!here GAME NIGHT TONIGHT BRUHS!>";
}

const messageFactories = [
    dadJokeFactory,
    bugCatFactory,
    pingEthanFactory,
    gamersFactory
]

client.on("message", (msg) => {
  if (!msg.author.bot) {
      messageFactories
          .map(f => f(msg.content))
          .filter(response => response != undefined)
          .forEach(response => msg.channel.send(response));
  }
});


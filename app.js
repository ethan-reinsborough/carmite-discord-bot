//#region Startup
"use strict";

const fetch = require('node-fetch');

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

client.login(process.env.BOT_TOKEN);
//#endregion

function dadJokeFactory(body) {
  let pattern = /(^|(.*\s))(I|i)(('?m)|( am))\s(?<name>.+)/;
  let match = body.match(pattern);
  if (match) {
      let name = match.groups["name"];
      return `Nice to meet you ${name}, I am Charles.`;
  }
}

function pingEthanFactory(body) {
  if (/pingethan/.test(msg)) 
    return "<@!180787488950976523>";
}

function bugCatFactory(body) {
  if (msg.content.startsWith("<:christianserver:830284378180681798>")) 
    return "<@!461140829889626123>";
}

function gimmeCat(body){
  if(/gimmecat/.test(msg)){
    const { file } = fetch('https://aws.random.cat/meow').then(response => response.json());
    return file;
  }
}

const messageFactories = [
    dadJokeFactory,
    bugCatFactory,
    pingEthanFactory,
    gimmeCat
]

client.on("message", (msg) => {
  if (!msg.author.bot) {
      messageFactories
          .map(f => f(msg.content))
          .filter(response => response != undefined)
          .forEach(response => msg.channel.send(response));
  }
});


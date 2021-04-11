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
  if (/pingethan/.test(body)) 
    return "<@!180787488950976523>";
}

function bugCatFactory(body) {
  if (body.startsWith("<:christianserver:830284378180681798>")) 
    return "<@!461140829889626123>";
}

function gamersFactory(body){
  if (/summon gamers/.test(body)) 
    return "@here GAME NIGHT TONIGHT BRUHS!";
}

const messageFactories = [
    dadJokeFactory,
    bugCatFactory,
    pingEthanFactory,
    gamersFactory
]

client.on("message", async (msg) => {
  if (/gimmecat/.test(msg.content)) {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    msg.channel.send(file);
  }
  if(/gimmedog/.test(msg.content)){
    const res = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());
    msg.channel.send(res['message']);
  }
  if(/gimmeconfidence/.test(msg.content)){
    const adv = await fetch('https://www.affirmations.dev/').then(response => response.json());
    msg.channel.send(adv['affirmation']);
  }
  if(/urban/.test(msg.content)){
    var query = msg.content.substring(msg.content.toLowerCase().indexOf("n") + 1);
    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?term=${query}`).then(response => response.json());
    if (!list.length) {
      return message.channel.send(`No results found for ${query}.`);
    }
    message.channel.send(list[0].definition);
  }
  if (!msg.author.bot && !(/gimmecat/.test(msg.content))) {
    messageFactories
        .map(f => f(msg.content))
        .filter(response => response != undefined)
        .forEach(response => msg.channel.send(response));
  } 
});


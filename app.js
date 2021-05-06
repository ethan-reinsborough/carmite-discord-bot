//#region Startup
"use strict";

const fetch = require('node-fetch');
const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

const riotApiKey = process.env.RIOT_API_KEY;

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
  if (/ghelp/.test(msg.content.toLowerCase())) {
    msg.channel.send("Current Commands:\ng(imme): advice, anime, bored, cat, chuck, confidence, dad, dog, dumpy, fox");
  }
  if (/gcat/.test(msg.content.toLowerCase())) {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    msg.channel.send(file);
  }
  if(/gdog/.test(msg.content.toLowerCase())){
    const res = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());
    msg.channel.send(res['message']);
  }
  if(/gconfidence/.test(msg.content.toLowerCase())){
    const adv = await fetch('https://www.affirmations.dev/').then(response => response.json());
    msg.channel.send(adv['affirmation']);
  }
  if(/gadvice/.test(msg.content.toLowerCase())){
    const adv = await fetch('https://api.adviceslip.com/advice').then(response => response.json());
    msg.channel.send(adv[0]['advice']);
  }
  if(/gfox/.test(msg.content.toLowerCase())){
    const adv = await fetch('https://randomfox.ca/floof/').then(response => response.json());
    msg.channel.send(adv['image']);
  }
  if(/gbored/.test(msg.content.toLowerCase())){
    const res = await fetch('https://www.boredapi.com/api/activity/ ').then(response => response.json());
    msg.channel.send(res['activity']);
  } 
  if(/gchuck/.test(msg.content.toLowerCase())){
    const res = await fetch('https://api.chucknorris.io/jokes/random').then(response => response.json());
    msg.channel.send(res['value']);
  } 
  if(/gdumpy/.test(msg.content.toLowerCase())){
    const res = await fetch('https://api.tronalddump.io/random/quote').then(response => response.json());
    msg.channel.send(res['value']);
  } 
  if(/gshibe/.test(msg.content.toLowerCase())){
    const { file } = await fetch('http://shibe.online/api/shibes?count=1&urls=[true/false]&httpsUrls=[true/false]').then(response => response.json());
    msg.channel.send(file);
  } 
  if(/gdad/.test(msg.content.toLowerCase())){
    const { file } = await fetch('https://icanhazdadjoke.com').then(response => response.json());
    msg.channel.send(file);
  } 
  if(/ganime/.test(msg.content.toLowerCase())){
    let randomNum = Math.floor((Math.random() * 10000) + 1);
    
    const res = await fetch(`https://api.jikan.moe/v3/anime/${randomNum}/pictures`).then(response => response.json());
    const res2 = await fetch(`https://api.jikan.moe/v3/anime/${randomNum}`).then(response => response.json());
    const title = res2['title'];
    if(title === undefined){
      msg.channel.send("No results found. Please try again.");
    }
    else{
      msg.channel.send(`${title}`);
      let pictureList = Object.keys(res['pictures']).length;
      let randPic = Math.floor((Math.random() * pictureList));
      msg.channel.send(res['pictures'][`${randPic}`]['large']);
      
    } 
  } 
  if(/urban/.test(msg.content.toLowerCase())){
    let words = msg.content.toLowerCase().split(' ');
    let query = words.slice(1).join('+');
    msg.channel.send(query);
    let definitions = await fetch(`https://api.urbandictionary.com/v0/define?term=${query}`)
          .then(response => response.json()['list'].map(e => e.definition));
    definitions.push(`${query} is not a word, genius.`)
    msg.channel.send(definitions[0]);
  }

  if (!msg.author.bot) {
    messageFactories
        .map(f => f(msg.content))
        .filter(response => response != undefined)
        .forEach(response => msg.channel.send(response));
  } 
});


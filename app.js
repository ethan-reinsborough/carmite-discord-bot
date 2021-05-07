//#region Startup
"use strict";

const fetch = require('node-fetch');
const Discord = require("discord.js");
const hmtai = require("hmtai");
const HMfull = require("hmfull");
const nekoClient = require('nekos.life');
const neko = new nekoClient();
//const { HAnimeAPI } = require("hanime");

//const api = new HAnimeAPI();
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
    msg.channel.send("Current Commands:\ng(imme): advice, anime, tanime(first 50 pages), granime(very random), bored, cat, char, tchar(first 50 pages), grchar(very random), chuck, confidence, dad, dog, dumpy, fox");
  }
  if (/ghnsfw/.test(msg.content.toLowerCase())) {
    msg.channel.send("g: hentai, yuri, pantsu, thighs, tentacles, nsfwallpaper, ass, boobjob, nsfwgif, ahegao, doujin, neko, bdsm, femdom, incest, ero, elves, glasses, uniform, bang, moarthigh, public, boobs, nekoboobs, tits");
  }
  if (/nhelp/.test(msg.content.toLowerCase())) {
    msg.channel.send("Neko Help uwu | n: pat, slap, kiss, gif, baka, hug, holo, smug, waifu, punch");
  }
  if (/gcat/.test(msg.content.toLowerCase())) {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    msg.channel.send(file);
  }
  if(/gdog/.test(msg.content.toLowerCase())){
    const res = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());
    msg.channel.send(res['message']);
  }
  if(/ghentai/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.hentai());
  }
  if(/gyuri/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.yuri());
  }
  if(/gpantsu/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.pantsu());
  }
  if(/gthighs/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.thighs());
  }
  if(/gtentacles/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.tentacles());
  }
  if(/gnsfwallpaper/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.nsfwMobileWallpaper());
  }
  if(/gass/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.ass());
  }
  if(/gboobjob/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.boobjob());
  }
  if(/gnsfwgif/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.gif());
  }
  if(/gahegao/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.ahegao());
  }
  if(/gdoujin/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.manga());
  }
  if(/gneko/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.nsfwNeko());
  }
  if(/gbdsm/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.bdsm());
  }
  if(/gfemdom/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.femdom());
  }
  if(/gincest/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.incest());
  }
  if(/gero/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.ero());
  }
  if(/gelves/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.ero());
  }
  if(/gglasses/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.glasses());
  }
  if(/guniform/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.uniform());
  }
  if(/gbang/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.gangbang());
  }
  if(/gmoarthigh/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.zettaiRyouiki());
  }
  if(/gpublic/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.public());
  }
  if(/gnekoboobs/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.nsfw.boobs());
  }
  if(/glesbian/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.nsfw.lesbian());
  }/*
  if(/npat/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.pat());
  }
  if(/nslap/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.slap());
  }
  if(/nkiss/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.kiss());
  }
  if(/ngif/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.nekogif());
  }
  if(/nbaka/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.baka());
  }
  if(/nhug/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.hug());
  }
  if(/nholo/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.holo());
  }
  if(/nsmug/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.sfw.smug());
  }
  if(/nsmug/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.NekoLove.sfw.punch());
  }
  if(/gspank/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.Nekos.nsfw.spank());
  }
  if(/nwaifu/.test(msg.content.toLowerCase())){
    msg.channel.send(HMfull.NekoLove.sfw.waifu());
  } 
   Too powerful
  if(/ginfiniteporn/.test(msg.content.toLowerCase())){
    msg.channel.send(hmtai.nsfw.gif());
    msg.channel.send("ginfiniteporn");
  }*/
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
  if(/granime/.test(msg.content.toLowerCase())){
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
  if(/grchar/.test(msg.content.toLowerCase())){
    let randomNum = Math.floor((Math.random() * 45205) + 1);
    
    const res = await fetch(`https://api.jikan.moe/v3/character/${randomNum}/pictures`).then(response => response.json());
    const res2 = await fetch(`https://api.jikan.moe/v3/character/${randomNum}`).then(response => response.json());
    const title = res2['name'];
    const anime = res2['animeography']['0']['name'];
    const description = "Anime";

    if(title === undefined){
      msg.channel.send("No results found. Please try again.");
    }
    if(anime === undefined){
      anime = res2['mangaography']['0']['name'];
      description = "Manga";
    }
    else{
      msg.channel.send(`${title} (${description}: ${anime})`);
      let pictureList = Object.keys(res['pictures']).length;
      let randPic = Math.floor((Math.random() * pictureList));
      msg.channel.send(res['pictures'][`${randPic}`]['large']);
    } 
  }
  if(/granime/.test(msg.content.toLowerCase())){
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
  if(/gchar/.test(msg.content.toLowerCase())){
    let pageNum = Math.floor((Math.random() * 2717) + 1);
    const res = await fetch(`https://api.jikan.moe/v3/top/characters/${pageNum}`).then(response => response.json());
    let listLength = 49;
    let listNum = Math.floor((Math.random() * listLength));

    let title = res['top'][`${listNum}`]['title'];
    let rank = res['top'][`${listNum}`]['rank'];

    if(rank === 0){
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank}`);
    msg.channel.send(res['top'][`${listNum}`]['image_url']);
  }
  if(/gtchar/.test(msg.content.toLowerCase())){
    let pageNum = Math.floor((Math.random() * 50) + 1);
    const res = await fetch(`https://api.jikan.moe/v3/top/characters/${pageNum}`).then(response => response.json());
    let listLength = 49;
    let listNum = Math.floor((Math.random() * listLength));

    let title = res['top'][`${listNum}`]['title'];
    let rank = res['top'][`${listNum}`]['rank'];

    if(rank === 0){
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank}`);
    msg.channel.send(res['top'][`${listNum}`]['image_url']);
  }
  if(/gtanime/.test(msg.content.toLowerCase())){
    let pageNum = Math.floor((Math.random() * 50) + 1);
    const res = await fetch(`https://api.jikan.moe/v3/top/anime/${pageNum}`).then(response => response.json());
    //let listLength = Object.keys(res['top']).length;
    let listLength = 49;
    let listNum = Math.floor((Math.random() * listLength));
    let title = res['top'][`${listNum}`]['title'];
    let rank = res['top'][`${listNum}`]['rank'];
    let score = res['top'][`${listNum}`]['score'];
    if(score === 0){
      score = "Unscored";
    }
    if(rank === 0){
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank} | Score: ${score}`);
    msg.channel.send(res['top'][`${listNum}`]['image_url']);
  } 
  if(/ganime/.test(msg.content.toLowerCase())){
    let pageNum = Math.floor((Math.random() * 357) + 1);
    const res = await fetch(`https://api.jikan.moe/v3/top/anime/${pageNum}`).then(response => response.json());
    //let listLength = Object.keys(res['top']).length;
    let listLength = 49;
    let listNum = Math.floor((Math.random() * listLength));
    let title = res['top'][`${listNum}`]['title'];
    let rank = res['top'][`${listNum}`]['rank'];
    let score = res['top'][`${listNum}`]['score'];
    if(score === 0){
      score = "Unscored";
    }
    if(rank === 0){
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank} | Score: ${score}`);
    msg.channel.send(res['top'][`${listNum}`]['image_url']);
  } 
  //idk
  if(/gowo/.test(msg.content.toLowerCase())){
    let result = msg.content.substr(msg.content.indexOf(" ") + 1);
    neko.sfw.OwOify({text: `${result}`}).then(neko => {msg.channel.send(neko.owo)});
  }
  if(/nneko/.test(msg.content.toLowerCase())){
    neko.nsfw.neko().then(neko => {msg.channel.send(neko.url);});
  }
  if(/nhgif/.test(msg.content.toLowerCase())){
    neko.nsfw.randomHentaiGif().then(neko => {msg.channel.send(neko.url);});
  }
  if(/nngif/.test(msg.content.toLowerCase())){
    neko.nsfw.nekoGif().then(neko => {msg.channel.send(neko.url);});
  }
  if(/ngirlgif/.test(msg.content.toLowerCase())){
    neko.nsfw.girlSoloGif().then(neko => {msg.channel.send(neko.url);});
  }
  if(/nspank/.test(msg.content.toLowerCase())){
    neko.nsfw.spank().then(neko => {msg.channel.send(neko.url);});
  }
  if(/navatar/.test(msg.content.toLowerCase())){
    neko.nsfw.avatar().then(neko => {msg.channel.send(neko.url);});
  }
  if(/nboobs/.test(msg.content.toLowerCase())){
    neko.nsfw.boobs().then(neko => {msg.channel.send(neko.url);});
  }
  if(/ntits/.test(msg.content.toLowerCase())){
    neko.nsfw.tits().then(neko => {msg.channel.send(neko.url);});
  }
  if(/nkitsune/.test(msg.content.toLowerCase())){
    neko.nsfw.kitsune().then(neko => {msg.channel.send(neko.url);});
  }
  if(/nhentai/.test(msg.content.toLowerCase())){
    neko.nsfw.hentai().then(neko => {msg.channel.send(neko.url);});
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



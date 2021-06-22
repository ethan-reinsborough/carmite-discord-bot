//#region Imports
"use strict";
const fetch = require("node-fetch");
const fs = require("fs");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const hmtai = require("hmtai");
const Gamba = require("./models/gamba.js");
const HMfull = require("hmfull");
const { MessageEmbed } = require("discord.js");
const nekoClient = require("nekos.life");
const { Spawn } = require("pokecord");
const neko = new nekoClient();
const { LewdClient } = require("lewds.api");
const lApi = new LewdClient({ KEY: "Your-API-Key-Here" });
const prefix = ";";
require("dotenv").config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
//#endregion

mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

client.on("ready", () => {
  console.log("Bot is ready");
  client.user.setStatus("available");
  client.user.setPresence({
    activity: {
      name: ";help",
      type: 1,
      url: "https://www.twitch.tv/carmitecave",
    },
  });
});

client.login(process.env.BOT_TOKEN);


//#region Factory Implementation

/* Disabled as requested by users
function dadJokeFactory(body) {
  let pattern = /(^|(.*\s))(I|i)(('?m)|( am))\s(?<name>.+)/;
  let match = body.match(pattern);
  if (match) {
      let name = match.groups["name"];
      return `Nice to meet you ${name}, I am Charles.`;
  }
}
*/
/*
function pingEthanFactory(body) {
  if (/pingethan/.test(body)) return "<@!180787488950976523>";
}

function bugCatFactory(body) {
  if (body.startsWith("<:christianserver:830284378180681798>"))
    return "<@!461140829889626123>";
}

function gamersFactory(body) {
  if (/summon gamers/.test(body)) return "@here GAME NIGHT TONIGHT BRUHS!";
}

const messageFactories = [
  //dadJokeFactory,
  bugCatFactory,
  pingEthanFactory,
  gamersFactory,
];

let interval = null;
*/
//#endregion

//#region Testing outside of on(message)

//#endregion

//Main function, tracks when a user message matches a command (always active)
client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply("You can't do this!");
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
/*
  //#region G(imme) Commands

  if (/gmoney/.test(msg.content.toLowerCase())) {
 
    if(!msg.author.bot){
      const newGamba = new Gamba({
        _id: mongoose.Types.ObjectId(),
        userID: msg.author.id,
        money: "100"
      });
      newGamba.save().then(result => msg.channel.send(result));
      msg.channel.send("Success");
    }
  }

  if (/ganisong/.test(msg.content.toLowerCase())) {
    let randSong = Math.floor(Math.random() * 3386 + 1);

    const animeList = await fetch(
      `https://anusic-api.herokuapp.com/api/v1/anime`
    ).then((response) => response.json());

    let randomAnimeID = animeList["data"][randSong]["id"];

    const res = await fetch(
      `https://anusic-api.herokuapp.com/api/v1/anime/${randomAnimeID}`
    ).then((response) => response.json());

    let result =
      res["data"]["collections"]["0"]["themes"]["0"]["sources"]["0"]["link"];

    msg.channel.send(result);
  }

  if (/gdog/.test(msg.content.toLowerCase())) {
    const res = await fetch("https://dog.ceo/api/breeds/image/random").then(
      (response) => response.json()
    );
    msg.channel.send(res["message"]);
  }
  if (/ghentai/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.hentai());
  }
  if (/gyuri/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.yuri());
  }
  if (/gpantsu/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.pantsu());
  }
  if (/gthighs/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.thighs());
  }
  if (/gtentacles/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.tentacles());
  }
  if (/gnsfwallpaper/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.nsfwMobileWallpaper());
  }
  if (/gass/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.ass());
  }
  if (/gboobjob/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.boobjob());
  }
  if (/gnsfwgif/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.gif());
  }
  if (/gahegao/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.ahegao());
  }
  if (/gdoujin/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.manga());
  }
  if (/gneko/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.nsfwNeko());
  }
  if (/gbdsm/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.bdsm());
  }
  if (/gfemdom/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.femdom());
  }
  if (/gincest/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.incest());
  }
  if (/gero/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.ero());
  }
  if (/gelves/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.ero());
  }
  if (/gglasses/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.glasses());
  }
  if (/guniform/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.uniform());
  }
  if (/gbang/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.gangbang());
  }
  if (/gmoarthigh/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.zettaiRyouiki());
  }
  if (/gpublic/.test(msg.content.toLowerCase())) {
    msg.channel.send(hmtai.nsfw.public());
  }
  if (/gnekoboobs/.test(msg.content.toLowerCase())) {
    msg.channel.send(HMfull.Nekos.nsfw.boobs());
  }
  if (/gconfidence/.test(msg.content.toLowerCase())) {
    const adv = await fetch("https://www.affirmations.dev/").then((response) =>
      response.json()
    );
    msg.channel.send(adv["affirmation"]);
  }
  if (/gadvice/.test(msg.content.toLowerCase())) {
    const adv = await fetch("https://api.adviceslip.com/advice").then(
      (response) => response.json()
    );
    msg.channel.send(adv[0]["advice"]);
  }
  if (/gfox/.test(msg.content.toLowerCase())) {
    const adv = await fetch("https://randomfox.ca/floof/").then((response) =>
      response.json()
    );
    msg.channel.send(adv["image"]);
  }
  if (/gbored/.test(msg.content.toLowerCase())) {
    const res = await fetch("https://www.boredapi.com/api/activity/ ").then(
      (response) => response.json()
    );
    msg.channel.send(res["activity"]);
  }
  if (/gchuck/.test(msg.content.toLowerCase())) {
    const res = await fetch("https://api.chucknorris.io/jokes/random").then(
      (response) => response.json()
    );
    msg.channel.send(res["value"]);
  }
  if (/gdumpy/.test(msg.content.toLowerCase())) {
    const res = await fetch("https://api.tronalddump.io/random/quote").then(
      (response) => response.json()
    );
    msg.channel.send(res["value"]);
  }
  if (/gshibe/.test(msg.content.toLowerCase())) {
    const { file } = await fetch(
      "http://shibe.online/api/shibes?count=1&urls=[true/false]&httpsUrls=[true/false]"
    ).then((response) => response.json());
    msg.channel.send(file);
  }
  if (/granime/.test(msg.content.toLowerCase())) {
    let randomNum = Math.floor(Math.random() * 10000 + 1);

    const res = await fetch(
      `https://api.jikan.moe/v3/anime/${randomNum}/pictures`
    ).then((response) => response.json());
    const res2 = await fetch(
      `https://api.jikan.moe/v3/anime/${randomNum}`
    ).then((response) => response.json());
    const title = res2["title"];
    if (title === undefined) {
      msg.channel.send("No results found. Please try again.");
    } else {
      msg.channel.send(`${title}`);
      let pictureList = Object.keys(res["pictures"]).length;
      let randPic = Math.floor(Math.random() * pictureList);
      msg.channel.send(res["pictures"][`${randPic}`]["large"]);
    }
  }
  if (/grchar/.test(msg.content.toLowerCase())) {
    let randomNum = Math.floor(Math.random() * 45205 + 1);

    const res = await fetch(
      `https://api.jikan.moe/v3/character/${randomNum}/pictures`
    ).then((response) => response.json());
    const res2 = await fetch(
      `https://api.jikan.moe/v3/character/${randomNum}`
    ).then((response) => response.json());
    const title = res2["name"];
    const anime = res2["animeography"]["0"]["name"];
    const description = "Anime";

    if (title === undefined) {
      msg.channel.send("No results found. Please try again.");
    }
    if (anime === undefined) {
      anime = res2["mangaography"]["0"]["name"];
      description = "Manga";
    } else {
      msg.channel.send(`${title} (${description}: ${anime})`);
      let pictureList = Object.keys(res["pictures"]).length;
      let randPic = Math.floor(Math.random() * pictureList);
      msg.channel.send(res["pictures"][`${randPic}`]["large"]);
    }
  }
  if (/granime/.test(msg.content.toLowerCase())) {
    let randomNum = Math.floor(Math.random() * 10000 + 1);

    const res = await fetch(
      `https://api.jikan.moe/v3/anime/${randomNum}/pictures`
    ).then((response) => response.json());
    const res2 = await fetch(
      `https://api.jikan.moe/v3/anime/${randomNum}`
    ).then((response) => response.json());
    const title = res2["title"];
    if (title === undefined) {
      msg.channel.send("No results found. Please try again.");
    } else {
      msg.channel.send(`${title}`);
      let pictureList = Object.keys(res["pictures"]).length;
      let randPic = Math.floor(Math.random() * pictureList);
      msg.channel.send(res["pictures"][`${randPic}`]["large"]);
    }
  }
  if (/gchar/.test(msg.content.toLowerCase())) {
    let pageNum = Math.floor(Math.random() * 2717 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v3/top/characters/${pageNum}`
    ).then((response) => response.json());
    let listLength = 49;
    let listNum = Math.floor(Math.random() * listLength);

    let title = res["top"][`${listNum}`]["title"];
    let rank = res["top"][`${listNum}`]["rank"];

    if (rank === 0) {
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank}`);
    msg.channel.send(res["top"][`${listNum}`]["image_url"]);
  }
  if (/gtchar/.test(msg.content.toLowerCase())) {
    let pageNum = Math.floor(Math.random() * 50 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v3/top/characters/${pageNum}`
    ).then((response) => response.json());
    let listLength = 49;
    let listNum = Math.floor(Math.random() * listLength);

    let title = res["top"][`${listNum}`]["title"];
    let rank = res["top"][`${listNum}`]["rank"];

    if (rank === 0) {
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank}`);
    msg.channel.send(res["top"][`${listNum}`]["image_url"]);
  }
  if (/gbchar/.test(msg.content.toLowerCase())) {
    let pageNum = Math.floor(Math.random() * 10 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v3/top/characters/${pageNum}`
    ).then((response) => response.json());
    let listLength = 49;
    let listNum = Math.floor(Math.random() * listLength);

    let title = res["top"][`${listNum}`]["title"];
    let rank = res["top"][`${listNum}`]["rank"];

    if (rank === 0) {
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank}`);
    msg.channel.send(res["top"][`${listNum}`]["image_url"]);
  }
  if (/gtanime/.test(msg.content.toLowerCase())) {
    let pageNum = Math.floor(Math.random() * 50 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v3/top/anime/${pageNum}`
    ).then((response) => response.json());
    //let listLength = Object.keys(res['top']).length;
    let listLength = 49;
    let listNum = Math.floor(Math.random() * listLength);
    let title = res["top"][`${listNum}`]["title"];
    let rank = res["top"][`${listNum}`]["rank"];
    let score = res["top"][`${listNum}`]["score"];
    if (score === 0) {
      score = "Unscored";
    }
    if (rank === 0) {
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank} | Score: ${score}`);
    msg.channel.send(res["top"][`${listNum}`]["image_url"]);
  }
  if (/gbanime/.test(msg.content.toLowerCase())) {
    let pageNum = Math.floor(Math.random() * 10 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v3/top/anime/${pageNum}`
    ).then((response) => response.json());
    //let listLength = Object.keys(res['top']).length;
    let listLength = 49;
    let listNum = Math.floor(Math.random() * listLength);
    let title = res["top"][`${listNum}`]["title"];
    let rank = res["top"][`${listNum}`]["rank"];
    let score = res["top"][`${listNum}`]["score"];
    if (score === 0) {
      score = "Unscored";
    }
    if (rank === 0) {
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank} | Score: ${score}`);
    msg.channel.send(res["top"][`${listNum}`]["image_url"]);
  }
  if (/ganime/.test(msg.content.toLowerCase())) {
    let pageNum = Math.floor(Math.random() * 357 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v3/top/anime/${pageNum}`
    ).then((response) => response.json());
    //let listLength = Object.keys(res['top']).length;
    let listLength = 49;
    let listNum = Math.floor(Math.random() * listLength);
    let title = res["top"][`${listNum}`]["title"];
    let rank = res["top"][`${listNum}`]["rank"];
    let score = res["top"][`${listNum}`]["score"];
    if (score === 0) {
      score = "Unscored";
    }
    if (rank === 0) {
      rank = "Unranked";
    }
    msg.channel.send(`${title} | Rank: ${rank} | Score: ${score}`);
    msg.channel.send(res["top"][`${listNum}`]["image_url"]);
  }

  //#endregion

  //#region N(eko) Commands

  if (/nowo/.test(msg.content.toLowerCase())) {
    let result = msg.content.substr(msg.content.indexOf(" ") + 1);
    neko.sfw.OwOify({ text: `${result}` }).then((neko) => {
      msg.channel.send(neko.owo);
    });
  }
  if (/nneko/.test(msg.content.toLowerCase())) {
    neko.nsfw.neko().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nhgif/.test(msg.content.toLowerCase())) {
    neko.nsfw.randomHentaiGif().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nngif/.test(msg.content.toLowerCase())) {
    neko.nsfw.nekoGif().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/ngirlgif/.test(msg.content.toLowerCase())) {
    neko.nsfw.girlSoloGif().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nspank/.test(msg.content.toLowerCase())) {
    neko.nsfw.spank().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nsfwavatar/.test(msg.content.toLowerCase())) {
    neko.nsfw.avatar().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nboobs/.test(msg.content.toLowerCase())) {
    neko.nsfw.boobs().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/ntits/.test(msg.content.toLowerCase())) {
    neko.nsfw.tits().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nkitsune/.test(msg.content.toLowerCase())) {
    neko.nsfw.kitsune().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nero/.test(msg.content.toLowerCase())) {
    neko.nsfw.ero().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nnekoero/.test(msg.content.toLowerCase())) {
    neko.nsfw.eroNeko().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nyero/.test(msg.content.toLowerCase())) {
    neko.nsfw.eroYuri().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nkero/.test(msg.content.toLowerCase())) {
    neko.nsfw.eroKemonomimi().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nanal/.test(msg.content.toLowerCase())) {
    neko.nsfw.anal().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nclassic/.test(msg.content.toLowerCase())) {
    neko.nsfw.classic().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/npholo/.test(msg.content.toLowerCase())) {
    neko.nsfw.holo().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/npholoero/.test(msg.content.toLowerCase())) {
    neko.nsfw.holoEro().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/ngasm/.test(msg.content.toLowerCase())) {
    neko.nsfw.gasm().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nwaifu/.test(msg.content.toLowerCase())) {
    neko.sfw.waifu().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/ncatgirl/.test(msg.content.toLowerCase())) {
    neko.sfw.gecg().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nwallpaper/.test(msg.content.toLowerCase())) {
    neko.sfw.wallpaper().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nkiss/.test(msg.content.toLowerCase())) {
    neko.sfw.kiss().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nbaka/.test(msg.content.toLowerCase())) {
    neko.sfw.baka().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nslap/.test(msg.content.toLowerCase())) {
    neko.sfw.slap().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nsmug/.test(msg.content.toLowerCase())) {
    neko.sfw.smug().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/ncuddle/.test(msg.content.toLowerCase())) {
    neko.sfw.cuddle().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nsafeneko/.test(msg.content.toLowerCase())) {
    neko.sfw.neko().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nsafenekogif/.test(msg.content.toLowerCase())) {
    neko.sfw.nekoGif.then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/ntickle/.test(msg.content.toLowerCase())) {
    neko.sfw.tickle().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nlizard/.test(msg.content.toLowerCase())) {
    neko.sfw.lizard().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/navatar/.test(msg.content.toLowerCase())) {
    neko.sfw.avatar().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/npoke/.test(msg.content.toLowerCase())) {
    neko.sfw.poke().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nhug/.test(msg.content.toLowerCase())) {
    neko.sfw.hug().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nfeed/.test(msg.content.toLowerCase())) {
    neko.sfw.hug().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nholo/.test(msg.content.toLowerCase())) {
    neko.sfw.holo().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/ngoose/.test(msg.content.toLowerCase())) {
    neko.sfw.goose().then((neko) => {
      msg.channel.send(neko.url);
    });
  }
  if (/nfoxgirl/.test(msg.content.toLowerCase())) {
    neko.sfw.goose().then((neko) => {
      msg.channel.send(neko.url);
    });
  }

  //#endregion

  //#region L(ewd) Commands

  if (/lmilk/.test(msg.content.toLowerCase())) {
    lApi.nsfw("milk").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lewdass/.test(msg.content.toLowerCase())) {
    lApi.nsfw("ass").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lboobs/.test(msg.content.toLowerCase())) {
    lApi.nsfw("boobs").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lgifs/.test(msg.content.toLowerCase())) {
    lApi.nsfw("gifs").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lhboobs/.test(msg.content.toLowerCase())) {
    lApi.nsfw("hboobs").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lhentai/.test(msg.content.toLowerCase())) {
    lApi.nsfw("hentai").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lathighs/.test(msg.content.toLowerCase())) {
    lApi.nsfw("athighs").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lkink/.test(msg.content.toLowerCase())) {
    lApi.nsfw("kink").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lthighs/.test(msg.content.toLowerCase())) {
    lApi.nsfw("thighs").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lyuri/.test(msg.content.toLowerCase())) {
    lApi.nsfw("yuri").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lthreed/.test(msg.content.toLowerCase())) {
    lApi.nsfw("threed").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lfurgif/.test(msg.content.toLowerCase())) {
    lApi.nsfw("furgif").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lpantsu/.test(msg.content.toLowerCase())) {
    lApi.nsfw("pantsu").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lrandom/.test(msg.content.toLowerCase())) {
    lApi.nsfw("random").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lslime/.test(msg.content.toLowerCase())) {
    lApi.nsfw("slime").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lkiss/.test(msg.content.toLowerCase())) {
    lApi.sfw("kiss").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lhug/.test(msg.content.toLowerCase())) {
    lApi.sfw("hug").then((result) => {
      msg.channel.send(result);
    });
  }

  if (/lpat/.test(msg.content.toLowerCase())) {
    lApi.sfw("pat").then((result) => {
      msg.channel.send(result);
    });
  }
  //#endregion

  //#region R(eddit) Commands
/*
  if (/rtgen/.test(msg.content.toLowerCase())) {
    
    let r = await fetch(
      `https://www.reddit.com/r/GenshinImpactNSFW/top.json?sort=top&show=all&t=all&after=${after}`
    ).then((response) => response.json());
    counter++;
    if (counter > 24) {
      after = r["data"]["after"];
      counter = -1;
      page++;
    }
    const embed = new MessageEmbed()
      .setAuthor(`Genshin NSFW (Top) | Page ${page} | Post ${counter}`)
      .setColor("#d6428c")
      .setImage(r["data"]["children"][counter]["data"]["url"])
      .setDescription(r["data"]["children"][counter]["data"]["url"]);
    msg.channel.send(embed);
  }

  if (/rmday/.test(msg.content.toLowerCase())) {
    interval2 = setInterval(() => {
      let r = fetch(
        `https://www.reddit.com/r/memes/hot.json?sort=top&show=all&t=all&after=${after6}`
      ).then((response) => response.json());
      counter6++;
      if (counter6 > 24) {
        after6 = r["data"]["after"];
        counter6 = -1;
        page6++;
      }
      const embed = new MessageEmbed()
        .setAuthor(`Meme of the Day`)
        .setColor("#d6428c")
        .setImage(r["data"]["children"][counter6]["data"]["url"])
        .setDescription(r["data"]["children"][counter6]["data"]["url"]);
      msg.channel.send(embed);
    }, 86400000);
  }

  if (/rhgen/.test(msg.content.toLowerCase())) {
    let r = await fetch(
      `https://www.reddit.com/r/GenshinImpactNSFW/hot.json?sort=hot&show=all&t=all&after=${after2}`
    ).then((response) => response.json());
    counter2++;
    if (counter2 > 24) {
      after2 = r["data"]["after"];
      counter2 = -1;
      page2++;
    }
    const embed = new MessageEmbed()
      .setAuthor(`Genshin NSFW (Hot) | Page ${page2} | Post ${counter2}`)
      .setColor("#d6428c")
      .setImage(r["data"]["children"][counter2]["data"]["url"])
      .setDescription(r["data"]["children"][counter2]["data"]["url"]);
    msg.channel.send(embed);
  }

  if (/rhlol/.test(msg.content.toLowerCase())) {
    let r = await fetch(
      `https://www.reddit.com/r/Rule34LoL/hot.json?sort=hot&show=all&t=all&after=${after3}`
    ).then((response) => response.json());
    counter4++;
    if (counter4 > 24) {
      after3 = r["data"]["after"];
      counter4 = -1;
      page3++;
    }
    const embed = new MessageEmbed()
      .setAuthor(`LoL NSFW (Hot) | Page ${page3} | Post ${counter4}`)
      .setColor("#d6428c")
      .setImage(r["data"]["children"][counter4]["data"]["url"])
      .setDescription(r["data"]["children"][counter4]["data"]["url"]);
    msg.channel.send(embed);
  }

  if (/rtlol/.test(msg.content.toLowerCase())) {
    let r = await fetch(
      `https://www.reddit.com/r/Rule34LoL/top.json?sort=hot&show=all&t=all&after=${after4}`
    ).then((response) => response.json());
    counter5++;
    if (counter5 > 24) {
      after4 = r["data"]["after"];
      counter5 = -1;
      page4++;
    }
    const embed = new MessageEmbed()
      .setAuthor(`LoL NSFW (Top) | Page ${page4} | Post ${counter5}`)
      .setColor("#d6428c")
      .setImage(r["data"]["children"][counter5]["data"]["url"])
      .setDescription(r["data"]["children"][counter5]["data"]["url"]);
    msg.channel.send(embed);
  }

  if (/rtgreset/.test(msg.content.toLowerCase())) {
    after = null;
    counter = -1;
    page = 1;
    msg.channel.send("Genshin NSFW top page list has been reset.");
  }

  if (/rhgreset/.test(msg.content.toLowerCase())) {
    after = null;
    counter2 = -1;
    page2 = 1;
    msg.channel.send("Genshin NSFW hot page list has been reset.");
  }

  if (/rhlolreset/.test(msg.content.toLowerCase())) {
    after3 = null;
    counter4 = -1;
    page3 = 1;
    msg.channel.send("LoL NSFW hot page list has been reset.");
  }
*/
  /*
  const filter = (reaction, user) => {
    return reaction.emoji.name === '👍' && user.id === message.author.id;
  };
  
  msg.awaitReactions(filter, { max: 4, time: 10000, errors: ['time'] })
    .then(collected => msg.channel.send(collected.size))
    .catch(collected => {
      msg.channel.send(`After a minute, only ${collected.size} out of 4 reacted.`);
    });
*/
  /*

  msg.channel
      .awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000,
      })
      .then((collected) => {
        const m = collected.first();
        if (!m.content || m.content.toLowerCase() !== indexedItemName.toLowerCase() || m.content.toLowerCase() !== indexedItemName.toLowerCase().replace(/'/g, ""))
          return msg.channel.send(
            `❌ | Incorrect guess! The answer was **${indexedItemName2}**.`
          );
          return msg.channel.send(`✅ | Correct guess!`);      
      })
      .catch(() => {
        msg.channel.send(
          `❌ | You did not answer in time. The correct answer was **${indexedItemName2}**!`
        );
      });

  */

  //#endregion

  //#region C(at) Commands
/*
  if (/cowo/.test(msg.content.toLowerCase())) {
    cont = true;
    input = msg.content.split(" ");
      interval = setInterval(() => {
        if (cont === true) {
        msg.channel.send(input[1]);
        counter3++
        }
      }, 12500);
  }

  if (/cstop/.test(msg.content.toLowerCase())) {
    msg.channel.send("Stopping cat's command...");
    cont = false;
    clearInterval(interval);
    interval = null;
    input = null;
    counter3 = 0;
    msg.channel.send(`Interval set to: ${interval}. Loop set to: ${cont}. Input is now ${input}`);
  }

  if (/ccheck/.test(msg.content.toLowerCase())) {
    msg.channel.send(`Counter is ${counter3}. If this is greater than 0, Charles is secretly horny.`);
    msg.channel.send(checkDB);
  }

  //#endregion

  //#region Snakecord

  if (/gsnake/.test(msg.content.toLowerCase())) {
    return snakeGame.newGame(msg);
  }
  //#endregion

  //#region Pokemon Game

  if (/gpokemon/.test(msg.content.toLowerCase())) {
    const pokemon = await Spawn().catch((e) => {});
    if (!pokemon) return msg.channel.send("Opps! Something went wrong :(");
    const filter = (m) => m.author.id === msg.author.id;

    const embed = new MessageEmbed()
      .setAuthor("Guess the pokemon")
      .setColor("#FFFF00")
      .setImage(pokemon.imageURL);

    await msg.channel.send(embed);

    msg.channel
      .awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000,
      })
      .then((collected) => {
        const m = collected.first();
        if (
          !m.content ||
          m.content.toLowerCase() !== pokemon.name.toLowerCase()
        )
          return msg.channel.send(
            `❌ | Incorrect guess! The answer was **${pokemon.name}**.`
          );
        return msg.channel.send(`✅ | Correct guess!`);
      })
      .catch(() => {
        msg.channel.send(
          `❌ | You did not answer in time. The correct answer was **${pokemon.name}**!`
        );
      });
  }

  //#endregion

  //#region LoL Functions

  if (/glol/.test(msg.content.toLowerCase())) {
    const res = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/champion.json`
    ).then((response) => response.json());
    const keys = Object.keys(res["data"]);
    const randIndex = Math.floor(Math.random() * keys.length);
    const championNameID = keys[randIndex];
    //let realName = res["data"][keith]["name"];
    const indexedChampion = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/11.9.1/data/en_US/champion/${championNameID}.json`
    ).then((response) => response.json());
    const randAbility = Math.floor(Math.random() * 5);

    let abilityID;
    let abilityType;
    let abilityName;
    let image;

    if (randAbility === 4) {
      abilityName = indexedChampion["data"][championNameID]["passive"]["name"];
      abilityType = "passive";
      abilityID =
        indexedChampion["data"][championNameID]["passive"]["image"]["full"];
      image = `http://ddragon.leagueoflegends.com/cdn/11.9.1/img/${abilityType}/${abilityID}`;
    } else {
      abilityID =
        indexedChampion["data"][championNameID]["spells"][randAbility]["id"];
      abilityType = "spell";
      abilityName =
        indexedChampion["data"][championNameID]["spells"][randAbility]["name"];
      image = `http://ddragon.leagueoflegends.com/cdn/11.9.1/img/${abilityType}/${abilityID}.png`;
    }

    const filter = (m) => m.author.id === msg.author.id;

    const embed = new MessageEmbed()
      .setAuthor(`Guess the ${abilityType}`)
      .setColor("#16b5ff")
      .setImage(image);

    await msg.channel.send(embed);

    msg.channel
      .awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000,
      })
      .then((collected) => {
        const m = collected.first();
        if (
          !m.content ||
          m.content.toLowerCase() !== abilityName.toLowerCase() ||
          m.content.toLowerCase() !==
            abilityName.toLowerCase().replace(/'/g, "")
        )
          return msg.channel.send(
            `❌ | Incorrect guess! The answer was **${abilityName}**.`
          );
        return msg.channel.send(`✅ | Correct guess!`);
      })
      .catch(() => {
        msg.channel.send(
          `❌ | You did not answer in time. The correct answer was **${abilityName}**!`
        );
      });
  }

  if (/gitem/.test(msg.content.toLowerCase())) {
    const res = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/item.json`
    ).then((response) => response.json());
    const keys = Object.keys(res["data"]);
    const randIndex = Math.floor(Math.random() * keys.length);
    const itemID = keys[randIndex];

    let indexedItemName = res["data"][itemID]["name"];
    let indexedItemImage = res["data"][itemID]["image"]["full"];
    let indexedItemName2 = indexedItemName;
    if (indexedItemName.indexOf("'") >= 0) {
      indexedItemName2 +=
        " / " + indexedItemName2.toLowerCase().replace(/'/g, "");
    }

    const filter = (m) => m.author.id === msg.author.id;

    const embed = new MessageEmbed()
      .setAuthor(`Guess the item`)
      .setColor("#16b5ff")
      .setImage(
        `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/item/${indexedItemImage}`
      );

    await msg.channel.send(embed);

    msg.channel
      .awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000,
      })
      .then((collected) => {
        const m = collected.first();
        if (
          !m.content ||
          m.content.toLowerCase() !== indexedItemName.toLowerCase() ||
          m.content.toLowerCase() !==
            indexedItemName.toLowerCase().replace(/'/g, "")
        )
          return msg.channel.send(
            `❌ | Incorrect guess! The answer was **${indexedItemName2}**.`
          );
        return msg.channel.send(`✅ | Correct guess!`);
      })
      .catch(() => {
        msg.channel.send(
          `❌ | You did not answer in time. The correct answer was **${indexedItemName2}**!`
        );
      });
  }

  if (/gicon/.test(msg.content.toLowerCase())) {
    const res = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/item.json`
    ).then((response) => response.json());
    const keys = Object.keys(res["data"]);
    const randIndex = Math.floor(Math.random() * keys.length);
    const iconID = keys[randIndex];
    const embed = new MessageEmbed()
      .setAuthor(`Random Icon`)
      .setColor("#16b5ff")
      .setImage(
        `http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${iconID}.png`
      );

    await msg.channel.send(embed);
  }
  //#endregion

  if (!msg.author.bot) {
    messageFactories
      .map((f) => f(msg.content))
      .filter((response) => response != undefined)
      .forEach((response) => msg.channel.send(response));
  }
  */
});

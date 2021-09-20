
  
  const { MessageEmbed } = require("discord.js");
  const { Spawn } = require("pokecord");
  module.exports = {
      name: "pk",
      description: "Shows the Top Knit(s) (TAHM KENCH HAHA)",
      async execute(msg) {
        
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
        
      },
    };

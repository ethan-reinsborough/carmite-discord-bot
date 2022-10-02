
    const { MessageEmbed } = require("discord.js");
  
  module.exports = {
    name: "lolico",
    description: "LOL ICON WOO",
    async execute(msg) {
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
              `http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/${iconID}.png`
            );
      
          await msg.channel.send(embed);
    },
  };
  
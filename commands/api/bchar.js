const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bchar",
    description: "Gives a random anime character from the top 500 results.",
    async execute(message) {
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

        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new MessageEmbed()
          .setAuthor(`${title} | Rank: ${rank}`)
          .setColor(randomColor)
          .setImage(res["top"][`${listNum}`]["image_url"])
          message.channel.send(embed);
    },
  };

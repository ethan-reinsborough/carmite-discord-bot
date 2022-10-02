const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "banime",
  description: "Gives a random anime from the top 500 results.",
  async execute(message) {
    let pageNum = Math.floor(Math.random() * 10 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${pageNum}`
    ).then((response) => response.json());
    let listLength = 24;
    let listNum = Math.floor(Math.random() * listLength);
    let title = res["data"][`${listNum}`]["title"];
    let rank = res["data"][`${listNum}`]["rank"];
    let score = res["data"][`${listNum}`]["score"];
    if (score === 0) {
      score = "Unscored";
    }
    if (rank === 0) {
      rank = "Unranked";
    }

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new MessageEmbed()
          .setAuthor(`${title} | Rank: ${rank} | Score: ${score}`)
          .setColor(randomColor)
          .setImage(res["data"][`${listNum}`]["image_url"])
          message.channel.send(embed);
  },
};

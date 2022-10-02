const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "animeop",
  description: "Gives a random anime opening from the top 500 results.",
  async execute(message) {
    let pageNum = Math.floor(Math.random() * 10 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${pageNum}`
    ).then((response) => response.json());
    let listLength = 24;
    let listNum = Math.floor(Math.random() * listLength);
    let title = res["data"][`${listNum}`]["title"];
    let malId = res["data"][`${listNum}`]["mal_id"];
    
    const op = await fetch(`http://animethemes-api.herokuapp.com/api/v1/theme/${malId}-00`).then((response) => response.json());

    message.channel.send(title + "\n" + op["mirrors"]["0"]["mirror"]);
    
  },
};

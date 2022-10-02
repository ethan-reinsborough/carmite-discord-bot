const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "animetrailer",
  description: "Gives a random anime trailer from popular results.",
  async execute(message) {
    let pageNum = Math.floor(Math.random() * 10 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${pageNum}`
    ).then((response) => response.json());
    let listLength = 24;
    let listNum = Math.floor(Math.random() * listLength);
    let title = res["data"][`${listNum}`]["title"];
    let trailer = res["data"][`${listNum}`]["trailer"]["url"];

    message.channel.send(title + "\n" + trailer);
  },
};

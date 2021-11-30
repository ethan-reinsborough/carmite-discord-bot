module.exports = {
  name: "animeop",
  description: "Gives a random anime opening song.",
  async execute(message) {
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

    message.channel.send(result);
  },
};

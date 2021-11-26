module.exports = {
  name: "banime",
  description: "Gives a random anime from the top 500 results.",
  async execute(message) {
    let pageNum = Math.floor(Math.random() * 10 + 1);
    const res = await fetch(
      `https://api.jikan.moe/v3/top/anime/${pageNum}`
    ).then((response) => response.json());
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
    message.channel.send(`${title} | Rank: ${rank} | Score: ${score}`);
    message.channel.send(res["top"][`${listNum}`]["image_url"]);
  },
};

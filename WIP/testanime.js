module.exports = {
    name: "testanime",
    description: "Test",
    async execute(message) {
      const animeList = await fetch(
        `https://themes.moe/list/popular/100`
      ).then((response) => response.json());
      message.channel.send(result);
    },
  };
  
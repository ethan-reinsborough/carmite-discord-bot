module.exports = {
  name: "trump",
  description: "He may no longer be president, but his dumb tweets live on.",
  async execute(message) {
    const res = await fetch("https://api.tronalddump.io/random/quote").then(
      (response) => response.json()
    );
    message.channel.send(res["value"]);
  },
};

module.exports = {
  name: "fox",
  description: "Gives a random image of a fox.",
  async execute(message) {
    const adv = await fetch("https://randomfox.ca/floof/").then((response) =>
      response.json()
    );
    message.channel.send(adv["image"]);
  },
};

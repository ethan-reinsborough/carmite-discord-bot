module.exports = {
  name: "chuck",
  description: "What would Chuck Norris do?",
  async execute(message) {
    const res = await fetch("https://api.chucknorris.io/jokes/random").then(
      (response) => response.json()
    );
    message.channel.send(res["value"]);
  },
};

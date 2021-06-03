module.exports = {
  name: "bored",
  description: "Gives random activities to cure your boredom.",
  async execute(message) {
    const res = await fetch("https://www.boredapi.com/api/activity/ ").then(
      (response) => response.json()
    );
    message.channel.send(res["activity"]);
  },
};

module.exports = {
  name: "Random Cat",
  description: "Gives a random image of a cat.",
  aliases: ["cat"],
  usage: "[cat]",
  execute(message) {
    //const { file } = fetch("https://aws.random.cat/meow").then(
     // (response) => response.json()
    //);
    message.channel.send("Meow");
  },
};

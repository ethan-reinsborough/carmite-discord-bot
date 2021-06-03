module.exports = {
  name: "Random Cat",
  description: "Gives a random image of a cat.",
  usage: "cat",
  execute(msg, args) {
    const { file } = await fetch("https://aws.random.cat/meow").then(
      (response) => response.json()
    );
    msg.channel.send(file);
  },
};

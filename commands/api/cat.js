module.exports = {
  name: "cat",
  description: "Gives a random image of a cat.",
  async execute(message) {
    const { file } = await fetch("https://aws.random.cat/meow").then(
      (response) => response.json()
    );
    message.channel.send(file);
  },
};

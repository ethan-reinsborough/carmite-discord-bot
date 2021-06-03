module.exports = {
    name: "dog",
    description: "Gives a random image of a dog.",
    async execute(message) {
        const res = await fetch("https://dog.ceo/api/breeds/image/random").then(
            (response) => response.json()
          );
          message.channel.send(res["message"]);
    },
  };
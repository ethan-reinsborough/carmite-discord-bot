const hmtai = require("hmtai");

module.exports = {
    name: "nero",
    description: "Gives a nsfw erotic anime image.",
    async execute(message) {
        message.channel.send(hmtai.nsfw.ero());
    },
  };
  
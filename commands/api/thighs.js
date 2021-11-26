const hmtai = require("hmtai");

module.exports = {
    name: "thighs",
    description: "Gives a nsfw thighs image.",
    async execute(message) {
        message.channel.send(hmtai.nsfw.thighs());
    },
  };
  
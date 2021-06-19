const hmtai = require("hmtai");

module.exports = {
    name: "nthighs",
    description: "Gives a nsfw thighs image.",
    async execute(message) {
        message.channel.send(hmtai.nsfw.thighs());
    },
  };
  
const hmtai = require("hmtai");

module.exports = {
    name: "nneko",
    description: "Gives a n(sfw) neko image.",
    async execute(message) {
        message.channel.send(hmtai.nsfw.nsfwNeko());
    },
  };
  
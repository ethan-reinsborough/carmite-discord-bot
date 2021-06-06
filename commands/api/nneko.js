const hmtai = require("hmtai");

msg.channel.send(hmtai.nsfw.nsfwNeko());
module.exports = {
    name: "nneko",
    description: "Gives a n(sfw) neko image.",
    async execute(message) {
        message.channel.send(hmtai.nsfw.nsfwNeko());
    },
  };
  
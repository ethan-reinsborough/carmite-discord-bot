const hmtai = require("hmtai");

module.exports = {
    name: "yuri",
    description: "Gives a nsfw yuri image.",
    async execute(message) {
        message.channel.send(hmtai.nsfw.yuri());
    },
  };
  
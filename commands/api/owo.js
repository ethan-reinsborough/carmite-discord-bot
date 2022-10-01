const Uwuifier = require('uwuifier');

module.exports = {
    name: "owo",
    description: "Makes uwu all owo :3",
    async execute(message) {
        const uwuifier = new Uwuifier();
        var uwu = message.content.substring(';owo'.length);
        message.channel.send(uwuifier.uwuifySentence(uwu));
    },
  };
  
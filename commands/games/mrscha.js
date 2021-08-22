const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "mrscha",
    description: "Oh god why did I make this.",
    async execute(message) {
        const filter = (m) => m.author.id === message.author.id;
        var username;
        /*
        const embed = new MessageEmbed()
          .setDescription("")
          .setColor("#16b5ff")
          .setImage('https://i.imgur.com/QZUVE1P.png')
        */
          const embed = new MessageEmbed()
          .setColor("#16b5ff")
          .setImage('https://i.imgur.com/fFEByVV.jpg')
        await message.channel.send(embed);
        
        message.channel
          .awaitMessages(filter, {
            max: 1,
            error: ["time"],
            time: 30000,
          })
          .then((collected) => {
            const m = collected.first();
            username = m.content;
            const embed = new MessageEmbed()
            .setColor("#16b5ff")
            .setAuthor(`Nice to meet you ${username}! Your journey is about to begin.`);
            message.channel.send(embed);
          })
          .catch(() => {
            message.channel.send(
              `❌ | You did not answer in time.`
            );
          });
    },
  };
  
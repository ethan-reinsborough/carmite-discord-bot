const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "mrscha",
    description: "Oh god why did I make this.",
    async execute(message) {
        const filter = (m) => m.author.id === msg.author.id;
        var username;
        /*
        const embed = new MessageEmbed()
          .setDescription("")
          .setColor("#16b5ff")
          .setImage('https://i.imgur.com/QZUVE1P.png')
        */
          const embed = new MessageEmbed()
          .setColor("#16b5ff")
          .setImage('https://i.imgur.com/QZUVE1P.png')
        await message.channel.send(embed);
        
        msg.channel
          .awaitMessages(filter, {
            max: 1,
            error: ["time"],
            time: 99999,
          })
          .then((collected) => {
            const m = collected.first();
            username = m.content;
            return msg.channel.send(`Nice to meet you ${username}!`);
          })
          .catch(() => {
            msg.channel.send(
              `❌ | You did not answer in time.`
            );
          });
    },
  };
  
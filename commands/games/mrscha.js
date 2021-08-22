const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "mrscha",
    description: "Oh god why did I make this.",
    async execute(message) {
        //const filter = (m) => m.author.id === msg.author.id;
        message.channel.send("HI");
        const embed = new MessageEmbed()
          .setAuthor(`Mrs Cha Test`)
          .setColor("#16b5ff")
          .setImage('https://i.imgur.com/QZUVE1P.png')
          .setDescription('does this go below');
    
        await message.channel.send(embed);
        /*
        msg.channel
          .awaitMessages(filter, {
            max: 1,
            error: ["time"],
            time: 99999,
          })
          .then((collected) => {
            const m = collected.first();
            if (
              !m.content ||
              m.content.toLowerCase() !== abilityName.toLowerCase() 
            )
              return msg.channel.send(
                `❌ | Incorrect guess! The answer was **${abilityName}**.`
              );
            return msg.channel.send(`✅ | Correct guess!`);
          })
          .catch(() => {
            msg.channel.send(
              `❌ | You did not answer in time. The correct answer was **${abilityName}**!`
            );
          });*/
    },
  };
  
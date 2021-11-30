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
            .setAuthor(`Nice to meet you ${username}! Your journey is about to start!`);
           message.channel.send(embed);
           const embed2 = new MessageEmbed()
          .setDescription("Welcome to the quiet neighborhood of Bottville. You moved here alone after your parents kicked you out for wasting all your time on League of Legends. Your aunt Mrs. Cha pitied you and decided to take you in. This is where your story begins.")
          .setColor("#16b5ff")
          .setImage('https://i.imgur.com/Nn0W2wz.png');
            message.channel.send(embed2);
          })
          .catch(() => {
            message.channel.send(
              `❌ | You did not answer in time.`
            );
          });
          setTimeout(() => {const embed3 = new MessageEmbed()
            .setDescription("You walk into the kitchen and come across Mrs. Cha. She looks happy to see you.")
            .setColor("#16b5ff")
            .setImage('https://i.imgur.com/NPFPIi1.png');
           message.channel.send(embed3);
           embed3.setDescription("Updated");
           message.channel.edit(embed3);}, 10000);
          
    },
  };
  
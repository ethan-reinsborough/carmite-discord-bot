const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sudoku",
    description: "GL GAMER",
    async execute(message) {
        const filter = (m) => m.author.id === message.author.id;

        //Matrix generation
        var matrix = new Array(9);

        for (var i = 0; i < matrix.length; i++){
            matrix[i] = new Array(9);
        }
        matrix[0][0] = 1;
        matrix[2][0] = 3;

          const embed = new MessageEmbed()
          .setColor("#16b5ff")
          .setTitle("Sudoku")
          .setDescription(`${matrix}`)
        await message.channel.send(embed);
        /*
        message.channel
          .awaitMessages(filter, {
            max: 1,
            error: ["time"],
            time: 300000,
          })
          .then((collected) => {
            const m = collected.first();
            username = m.content;
            const embed = new MessageEmbed()
            .setColor("#16b5ff")
            .setAuthor(`Nice to meet you ${username}! Your journey is about to start!`);
           message.channel.send(embed);
          })
          .catch(() => {
            message.channel.send(
              `❌ | You did not answer in time.`
            );
          });
          */      
    },
  };
  
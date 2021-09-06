const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sudoku",
    description: "GL GAMER",
    async execute(message) {
        const filter = (m) => m.author.id === message.author.id;
        var visualMatrix = "";
        //Matrix generation
        var matrix = new Array(9);

        for (var i = 0; i < matrix.length; i++){
            matrix[i] = new Array(9);
        }

        for(var x = 0; x < 9; x++){
            for(var y = 0; y < 9; y++){
                if(y == 0){
                    visualMatrix += "\n";
                }
                var rndNum = Math.floor(Math.random() * 6) + 1;
                matrix[x][y] += rndNum;
                visualMatrix += rndNum;
            }
        }
          const embed = new MessageEmbed()
          .setColor("#16b5ff")
          .setTitle("Sudoku")
          .setDescription(`${visualMatrix}`)
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
  
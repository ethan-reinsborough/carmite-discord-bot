const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sudoku",
    description: "old man activity",
    async execute(message) {
        const filter = (m) => m.author.id === message.author.id;
        var visualMatrix = "```\n------------------------------------\n";
        //Matrix generation
        var matrix = new Array(9);

        for (var i = 0; i < matrix.length; i++){
            matrix[i] = new Array(9);
        }

        for(var x = 0; x < 9; x++){
            var numberPool = [1,2,3,4,6,7,8,9];
            shuffleArray(numberPool);
            for(var y = 0; y < 9; y++){
                if(y == 0){
                    visualMatrix += "\n";
                }
                if(y == 3 || y == 6){
                    visualMatrix += " | ";
                }
                if(x == 3 && y == 0 || x == 6 && y == 0){
                    visualMatrix += "------------------------------------\n"
                }
                var isEmptySquare = Math.floor(Math.random() * 9) + 1;
                if(isEmptySquare > 5){
                    var rndNum = numberPool[y];
                }
                else{
                    var rndNum = ".";
                }
                matrix[x][y] += rndNum;
                visualMatrix += ` ${rndNum} `;
            }
        }
        visualMatrix += "\n------------------------------------\n";
        visualMatrix += "\n```";
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
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
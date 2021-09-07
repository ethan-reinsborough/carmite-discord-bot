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
            var numberPool = [1,2,3,4,5,6,7,8,9];
            shuffleArray(numberPool);
            for(var y = 0; y < 9; y++){               
                var rndNum = numberPool[y];
                matrix[x][y] = rndNum;
            }
        }
        for(var x = 0; x < 9; x++){
            for(var y = 0; y < 9; y++){
       
                //if 1,1 == 2,1 then . it
                /*
                    var searchArray = [0,1,2,3,4,5,6,7,8,9];
                    searchArray.splice(y,1);
                    for(l = 0; l < 9; l++){
                        for(p = 0; p < 9; p++){
                            if(matrix[x][y] == matrix[l][searchArray[p]] && matrix[x][y] != "."){
                                matrix[x][y] = ".";
                            }
                        }   
                    }          
                    */
                //Column check
                message.channel.send(x);
                var searchArray = [0,1,2,3,4,5,6,7,8,9];
                searchArray.splice(x,1);
                message.channel.send(searchArray);
                
                if(matrix[x][y] == matrix[searchArray[0]][y] || matrix[x][y] == matrix[searchArray[1]][y] || matrix[x][y] == matrix[searchArray[2]][y] ||
                    matrix[x][y] == matrix[searchArray[3]][y] || matrix[x][y] == matrix[searchArray[4]][y] || matrix[x][y] == matrix[searchArray[5]][y] ||
                    matrix[x][y] == matrix[searchArray[6]][y] || matrix[x][y] == matrix[searchArray[7]][y]){
                    matrix[x][y] == ".";
                }


                //3x3 check

                //1st box
                /*
                if(x <= 2 && y <= 2){
                    var searchArray = [0,1,2];
                    for(var j = 0; j < searchArray.length; j++){
                        for(var k = 0; k < searchArray.length; k++){
                            if(matrix[x][y] == matrix[j][k]){
                                matrix[x][y] = ".";
                            }
                        }
                    }
                }*/
                //2nd box
                if(x <= 2 && y > 2 && y < 6){
                    
                }
                //3rd box
                if(x <= 2 && y > 5){
                    
                }
                //4th box
                if(x > 2 && x < 6 && y <= 2){

                }
                //5th box
                if(x > 2 && x < 6 && y > 2 && y < 6){
                    
                }
                //6th box
                if(x > 2 && x < 6 && y > 5){
                    
                }
                //7th box
                if(x > 5 && y <= 2){

                }
                //8th box
                if(x > 5 && y > 2 && y < 6){
                    
                }
                //9th box
                if(x > 5 && y > 5){
                    
                }
            }
        }
        message.channel.send(matrix);

        for(var x = 0; x < 9; x++){
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
                //var rndNum = numberPool[y];
                //matrix[x][y] += rndNum;
                visualMatrix += ` ${matrix[x][y]} `;
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
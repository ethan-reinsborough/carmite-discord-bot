const apiKey = "RGAPI-aab4da62-ae4c-4880-a994-1d8bc3cb6dd2";
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stalk",
    description: "Track people hehe.",
    async execute(message) {
        input = message.content.split(" ");
        if (input[1] == null) {
            message.channel.send("Usage: ;stalk <summoner name> (optional): <track> (optional): <stop> (ends the update)");
            return;
        }
        const summoner = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURIComponent(input[1])}?api_key=${apiKey}`).then(
            (response) => response.json()
        );
        var id = summoner["id"];
        async function checkInGame(){
            try {           
                const match = await fetch(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${apiKey}`).then(
                    (response) => response.json()
                );
                var team1, team2 = "";
                for (let x = 0; x < 10; x++) {
                    if(match["participants"][x]["teamId"] == 100){
                        team1 += (match["participants"][x]["summonerName"] + "\n");
                    } else {
                        team2 += (match["participants"][x]["summonerName"] + "\n");
                    }        
                }
                const embed = new MessageEmbed()
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/profileicon/${summoner["profileIconId"]}.png`)
                    .setAuthor(`${summoner["name"]}`)
                    .setTitle(`In Game: ${match["gameMode"]}`)
                    .setDescription(`**Teams:**\n\n${team1}\n---------------------\n\n${team2}`)
                await message.channel.send(embed);   
            }
            catch (error){
                message.channel.send("User does not exist or is not currently in game.");
            }
        }
        if(input[2] == "stop"){
            message.channel.send("Stopping the tracking of " + input[1]);
            clearInterval(global.interval);
            global.interval = null;
        }
        if(input[2] == "track"){
            message.channel.send(`Beginning the tracking of ${input[1]}. Currently checking status every minute.`)
            global.interval = setInterval(() => {
                checkInGame();
              }, 60000);
        }
        if(input[2] == "" || input[2] == null){
            checkInGame();
        }       
    },
  };
  
  
const apiKey = "RGAPI-2c571771-a9a5-4d46-b7c8-54c04ad02b91";
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stalk",
    description: "Track people hehe.",
    async execute(message) {
        input = message.content.split(" ");
        if (input[1] == null) {
            message.channel.send("Usage: ;wr <summoner name> <number of matches to filter through> <gamemode name>. Don't use spaces in summoner name.");
            return;
        }

        var summonerName = input[1].split('#')
        message.channel.send(summonerName);
        const summoner = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(summonerName[0])}/${summonerName[1]}?api_key=${apiKey}`).then(
            (response) => response.json()
        );

        var id = summoner["puuid"];
        message.channel.send(id)
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
  
  
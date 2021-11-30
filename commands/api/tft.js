const apiKey = process.env.RIOT_API_KEY;
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "tft",
    description: "Experimental command to show tft match history in discord.",
    async execute(message) {
        input = message.content.split(" ");

        if(input[1] == null){
            message.channel.send("Usage: tft <summoner name>");
            return;
        }

        const summoner = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${input[1]}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
          );
        var id = summoner["id"];
        var puuid = summoner["puuid"];

        const rankedStats = await fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
          );
        
        var header = `${input[1]}: ${rankedStats[0]["tier"]} ${rankedStats[0]["rank"]} ${rankedStats[0]["leaguePoints"]} LP`;
        message.channel.send(header);
        const matches = await fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=10&api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
        );
        var content = "";
          //Get each match in matches
          for (let i = 0; i < 9; i++) {
            var printMatch = "\n--------------------------------------------------------------------------------------------------------------------------------------\n";
            var match = await fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/${matches[i]}?api_key=${process.env.RIOT_API_KEY}`).then(
                (response) => response.json()
              );
            var players = "Players: ";
            for(let x = 0; x < 8; x++){

                var p = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${match["metadata"]["participants"][x]}?api_key=${process.env.RIOT_API_KEY}`).then(
                (response) => response.json());
              if(x < 7){
                players += p["name"] +", ";
              }else{
                players += p["name"];
              }
            }
            printMatch += players;
            var matchStats = "";
            var matchType = "";
            for(let y = 0; y < 7; y++){
                //If the player matches the summoner who calls command, get their match details
                if(String(match["info"]["participants"][y]["puuid"]) == String(puuid)){
                    matchType = match["info"]["tft_game_type"];
                    matchStats = `Level: ${match["info"]["participants"][y]["level"]}, Players eliminated: ${match["info"]["participants"][y]["players_eliminated"]}, Total DMG to players: ${match["info"]["participants"][i]["total_damage_to_players"]}`;
                    printMatch += `\nMode:${matchType}, ${matchStats}`;
                    const keys = Object.keys(match["info"]["participants"][y]["traits"]);
                    var traits = "";
                    for(let z = 0; z < keys.length; z++){
                        if(match["info"]["participants"][y]["traits"][z]["tier_total"] > 1 || match["info"]["participants"][y]["traits"][z]["name"] == "Set6_Socialite"){
                            traits += ` | ${match["info"]["participants"][y]["traits"][z]["name"]}: ${match["info"]["participants"][y]["traits"][z]["num_units"]} units | `;
                        }
                    } 
                    printMatch += `\n${traits}\n`
                    const unitKeys = Object.keys(match["info"]["participants"][y]["units"]);
                    var units = "";
                    for(let w = 0; w < unitKeys.length; w++){
                        var star = "";
                        if(match["info"]["participants"][y]["units"][w]["tier"] == 1){
                            star = "⭐"
                        }
                        if(match["info"]["participants"][y]["units"][w]["tier"] == 2){
                            star = "⭐⭐"
                        }
                        if(match["info"]["participants"][y]["units"][w]["tier"] == 3){
                            star = "⭐⭐⭐"
                        }
                        units += ` | ${match["info"]["participants"][y]["units"][w]["character_id"]} ${star} | `;
                    } 
                    printMatch += `\n${units}\n`                  
                }
            }
            var printMatch = "\n--------------------------------------------------------------------------------------------------------------------------------------\n";
            message.channel.send(printMatch);
          }            
    },
  };
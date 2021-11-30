const apiKey = process.env.RIOT_API_KEY;
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "tft",
    description: "Usage -> ;tft <summoner name> <number of matches to show>.",
    async execute(message) {
        input = message.content.split(" ");

        if(input[1] == null || input[2] == null || parseInt(input[2]) > 5 || isNaN(input[2])){
            message.channel.send("Usage: tft <summoner name> <number of matches to show (1-5)>");
            return;
        }

        //Name checking for cringe accent users
        if(input[1] == "Ayumi"){
            input[1] = "Ayumí"
        }
        if(input[1] == "Polaris"){
            input[1] = "Polariś"
        }

        const summoner = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURIComponent(input[1])}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
          );
        var id = summoner["id"];
        var puuid = summoner["puuid"];
        var rankedDisplay = "";
        const rankedStats = await fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
        ).catch((error) => {rankedDisplay = "Unranked"});
        if(rankedStats.length > 0){
            rankedDisplay = `${rankedStats[0]["tier"]} ${rankedStats[0]["rank"]} ${rankedStats[0]["leaguePoints"]} LP`;
        }else{
            rankedDisplay = "Unranked"
        }
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new MessageEmbed()
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${summoner["profileIconId"]}.png`)
        .setAuthor(`${summoner["name"]}`)
        .setTitle(`${rankedDisplay}`)
        .setColor(randomColor)
        .setFooter(`${input[2]} most recent match(es):`)
        await message.channel.send(embed);

        const matches = await fetch(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=${input[2]}&api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
        );
          //Get each match in matches
          for (let i = 0; i < parseInt(input[2]); i++) {
            var printMatch = "";
            printMatch += "```fix\n";
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
                    var placement = match["info"]["participants"][y]["placement"];
                    if(matchType == "pairs"){
                        matchType = "Double Up";
                        placement = GetDoubleUpPlacement(placement);
                    }
                    printMatch += `\nMode: ${matchType}\n`
                    matchStats = `Placement: ${placement} Level: ${match["info"]["participants"][y]["level"]}, Players eliminated: ${match["info"]["participants"][y]["players_eliminated"]}, Total DMG to players: ${match["info"]["participants"][y]["total_damage_to_players"]}`;
                    printMatch += `\n${matchStats}\n`;
                    const keys = Object.keys(match["info"]["participants"][y]["traits"]);
                    var traits = "";
                    for(let z = 0; z < keys.length; z++){
                        if(match["info"]["participants"][y]["traits"][z]["tier_total"] > 1 || match["info"]["participants"][y]["traits"][z]["name"] == "Set6_Socialite"){
                            traits += `${match["info"]["participants"][y]["traits"][z]["name"].replace("Set6_", "")}: ${match["info"]["participants"][y]["traits"][z]["num_units"]} unit(s)  `;
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
                        units += `${match["info"]["participants"][y]["units"][w]["character_id"].replace("TFT6_", "")} ${star}  `;
                    } 
                    printMatch += `\n${units}\n`                  
                }
            }
            printMatch += "```";
            message.channel.send(printMatch);
          }           
    },
  };

  function GetDoubleUpPlacement(placement) {
    if(placement == 1 || placement == 2){
        return "🏆 First 🏆";
    } 
    if(placement == 3 || placement == 4){
        return "🥈 Second 🥈";
    }
    if(placement == 5 || placement == 6){
        return "🥉 Third 🥉";
    }
    if(placement == 7 || placement == 8){
        return "😞 Fourth 😞";
    }
  }
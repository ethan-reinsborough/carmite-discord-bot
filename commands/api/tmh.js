const apiKey = process.env.RIOT_API_KEY;
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "tmh",
    description: "TFT MATCH HISTORY NEW!!! Usage -> ;tft <summoner name> <number of matches to show>.",
    async execute(message) {
        input = message.content.split(" ");

        if(input[1] == null || input[2] == null || parseInt(input[2]) > 10 || isNaN(input[2])){
            message.channel.send("Usage: tft <summoner name> <number of matches to show (1-10)>");
            return;
        }

        //Initialize the canvas and context
        const canvas = Canvas.createCanvas(700, 300)
        const context = canvas.getContext('2d')

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
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/${summoner["profileIconId"]}.png`)
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
            var matchStats = "";
            var matchType = "";
            var placement = "";
            for(let y = 0; y < 7; y++){
                //Incredibly monkey code way of determining your duo in double up using hex codes to add to the chaos
                var duo = "";
                if(String(match["info"]["participants"][y]["puuid"]) == String(puuid)){
                    var duo = match["info"]["participants"][y]["placement"];
                    var doublePlacement = GetDoubleUpPlacement(duo);
                    message.channel.send(doublePlacement);
                }
                if(doublePlacement == "#ffcb3d"){
                    if((match["info"]["participants"][y]["placement"] == 1 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid)) || (match["info"]["participants"][y]["placement"] == 2 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid))){
                        message.channel.send(match["info"]["participants"][y]["puuid"]);
                        duo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${match["info"]["participants"][y]["puuid"]}?api_key=${process.env.RIOT_API_KEY}`).then(
                            (response) => response.json());
                    }
                }
                if(doublePlacement == "#d4d4d4"){
                    if((match["info"]["participants"][y]["placement"] == 3 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid)) || (match["info"]["participants"][y]["placement"] == 4 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid))){
                        duo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${match["info"]["participants"][y]["puuid"]}?api_key=${process.env.RIOT_API_KEY}`).then(
                            (response) => response.json());
                    }
                }
                if(doublePlacement == "#945e1c"){
                    if((match["info"]["participants"][y]["placement"] == 5 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid)) || (match["info"]["participants"][y]["placement"] == 6 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid))){
                        duo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${match["info"]["participants"][y]["puuid"]}?api_key=${process.env.RIOT_API_KEY}`).then(
                            (response) => response.json());
                    }
                }
                if(doublePlacement == "#000000"){
                    if((match["info"]["participants"][y]["placement"] == 7 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid)) || (match["info"]["participants"][y]["placement"] == 8 && String(match["info"]["participants"][y]["puuid"]) !== String(puuid))){
                        duo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${match["info"]["participants"][y]["puuid"]}?api_key=${process.env.RIOT_API_KEY}`).then(
                            (response) => response.json());
                    }
                }
                //If the player matches the summoner who calls command, get their match details
                if(String(match["info"]["participants"][y]["puuid"]) == String(puuid)){
                    //Reset the background to avoid overlap from previous matches
                    const background = await Canvas.loadImage("https://i.imgur.com/aRoCXLa.png");
                    context.drawImage(background, 0, 0, canvas.width, canvas.height);
                    context.strokeRect(0, 0, 140, 150);
                    context.strokeRect(140, 0, 140, 150);
                    context.strokeRect(280, 0, 140, 150);
                    context.strokeRect(420, 0, 140, 150);
                    context.strokeRect(560, 0, 140, 150);
                    context.strokeRect(0, 150, 140, 150);
                    context.strokeRect(140, 150, 140, 150);
                    context.strokeRect(280, 150, 140, 150);
                    context.strokeRect(420, 150, 140, 150);
                    context.strokeRect(560, 150, 140, 150);
                    var placement = match["info"]["participants"][y]["placement"];
                    matchType = match["info"]["tft_game_type"];
                    if(matchType == "pairs"){
                        matchType = "Double Up";
                    }
                    printMatch += `\nMode: ${matchType}\n`
                    matchStats = `Level: ${match["info"]["participants"][y]["level"]}, Players eliminated: ${match["info"]["participants"][y]["players_eliminated"]}, Total DMG to players: ${match["info"]["participants"][y]["total_damage_to_players"]}`;
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
                    var xcord = 5;
                    for(let w = 0; w < unitKeys.length; w++){
                        var star = "";
                        var starcheck = 0;
                        if(match["info"]["participants"][y]["units"][w]["tier"] == 1){
                            starcheck = 1
                        }
                        if(match["info"]["participants"][y]["units"][w]["tier"] == 2){
                            starcheck = 2
                            star = await Canvas.loadImage("https://raw.communitydragon.org/pbe/game/assets/ux/tft/notificationicons/silverstar.png");
                        }
                        if(match["info"]["participants"][y]["units"][w]["tier"] == 3){
                            starcheck = 3
                            star = await Canvas.loadImage("https://raw.communitydragon.org/pbe/game/assets/ux/tft/notificationicons/goldstar.png");
                        }
                        var ycord = 5;
                        //If the loop moves onto the 6th element, display images in the next row
                        if(w > 4){
                            ycord = 155;
                        }
                        if(w == 5){
                            xcord = 5;
                        }
                        //Draw the champion's image into the correct coordinates
                        var champName = `${(match["info"]["participants"][y]["units"][w]["character_id"]).toLowerCase()}` + "_mobile.tft_set6.png";
                        var champImage = await Canvas.loadImage(`https://raw.communitydragon.org/pbe/game/assets/ux/tft/championsplashes/${champName}`);
                        context.drawImage(champImage, xcord, ycord, 130, 140);
                        //If the champion is greater than a 1 star, draw stars onto the image in the correct positions
                        if(starcheck > 1){
                            var displacement = 40;
                            if(starcheck == 2){
                                for(let c = 0; c < starcheck; c++){
                                    context.drawImage(star, xcord+displacement, ycord+120, 25, 25);
                                    displacement += 20;
                                }
                            }
                            if(starcheck == 3){
                                displacement = 35;
                                for(let c = 0; c < starcheck; c++){
                                    context.drawImage(star, xcord+displacement, ycord+120, 25, 25);
                                    displacement += 20;
                                }
                            }
                        }
                        //Move 140 pixels to the right for the next image in the sequence
                        xcord += 140;
                    }                  
                }
            }
            const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
                        const embed = new MessageEmbed()
                        .attachFiles(attachment)
                        .setColor(GetDoubleUpPlacement(placement))
                        .setDescription(printMatch)
                        .setFooter((duo["name"]).trim())
                        .setImage('attachment://profile-image.png')
                        message.channel.send(embed);
          }           
    },
  };

  function GetDoubleUpPlacement(placement) {
    if(placement == 1 || placement == 2){
        return "#ffcb3d";
    } 
    if(placement == 3 || placement == 4){
        return "#d4d4d4";
    }
    if(placement == 5 || placement == 6){
        return "#945e1c";
    }
    if(placement == 7 || placement == 8){
        return "#000000";
    }
  }
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = new Date(`${a.getFullYear() + '-' + a.getMonth + '-' + a.getDate}`)
    return time;
  }

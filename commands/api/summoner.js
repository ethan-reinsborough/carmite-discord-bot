const apiKey = process.env.RIOT_API_KEY;
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "summoner",
    description: "SUMMONER MATCH HISTORY NEW!!! Usage -> ;tft <summoner name> <number of matches to show>.",
    async execute(message) {
        input = message.content.split(" ");

        if(input[1] == null || input[2] == null || parseInt(input[2]) > 10 || isNaN(input[2])){
            message.channel.send("Usage: tft <summoner name> <number of matches to show (1-10)>");
            return;
        }

        if(input[1] == "Andrew"){
            input[1] = "Ãndrew";
        }
        const summoner = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURIComponent(input[1])}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
          );
        var id = summoner["id"];
        var puuid = summoner["puuid"];
        var rankedDisplay = "";
        /*
        const rankedStats = await fetch(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
        ).catch((error) => {rankedDisplay = "Unranked"});
        if(rankedStats.length > 0){
            rankedDisplay = `${rankedStats[0]["tier"]} ${rankedStats[0]["rank"]} ${rankedStats[0]["leaguePoints"]} LP`;
        }else{
            rankedDisplay = "Unranked"
        }*/
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new MessageEmbed()
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${summoner["profileIconId"]}.png`)
        .setAuthor(`${summoner["name"]}`)
        .setTitle(`${puuid}`)
        .setColor(randomColor)
        .setFooter(`${id}`)
        await message.channel.send(embed);     
    },
  };

  
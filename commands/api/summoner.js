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

        if (input[1] == null || input[2] == null || parseInt(input[2]) > 10 || isNaN(input[2])) {
            message.channel.send("Usage: tft <summoner name> <number of matches to show (1-10)>");
            return;
        }

        if (input[1] == "Andrew") {
            input[1] = "Ãndrew";
        }

        const summoner = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURIComponent(input[1])}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
        );

        var id = summoner["id"];
        var puuid = summoner["puuid"];

        const matchList = await fetch(`https://na1.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&api_key=${process.env.RIOT_API_KEY}&count=${parseInt(input[2])}`).then(
            (response) => response.json()
        );

        var wins = 0;
        var losses = 0;

        for (let i = 0; i < parseInt(input[2]); i++) {
            var match = matchList[i];
            const matchDetails = await fetch(`https://na1.api.riotgames.com/lol/match/v5/matches/${match}`).then(
                (response) => response.json());
            if(matchDetails["info"]["gameMode"] == "ARAM"){
                for(let x = 0; x < 9; x++){
                    if(matchDetails["metaData"]["participants"][x] == puuid){
                        if(matchDetails["info"]["participants"][x]["win"] == true){
                            wins += 1;
                        }else{
                            losses += 1;
                        }
                    }
                }
            }
        }
        var winrate = (wins / losses) * 100
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const embed = new MessageEmbed()
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${summoner["profileIconId"]}.png`)
            .setAuthor(`${summoner["name"]}`)
            .setTitle(`ARAM Winrate in ${input[2]} games: **${winrate}**`)
            .setColor(randomColor)
            .setFooter(`W${wins} L${losses}`)
        await message.channel.send(embed);
    },
};


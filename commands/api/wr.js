const apiKey = process.env.RIOT_API_KEY;
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "wr",
    description: "lol winrate Usage -> ;wr <summoner name> <number of matches to show> <gamemode name>.",
    async execute(message) {
        input = message.content.split(" ");
        if (input[1] == null || input[2] == null || input[3] == null || parseInt(input[2]) > 2000 || isNaN(input[2])) {
            message.channel.send("Usage: ;wr <summoner name> <number of matches to show> <gamemode name>");
            return;
        }
        if (input[1] == "Andrew") {
            input[1] = "Ãndrew";
        }
        var gamemode = input[3].toUpperCase();

        const summoner = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURIComponent(input[1])}?api_key=${process.env.RIOT_API_KEY}`).then(
            (response) => response.json()
        );

        var id = summoner["id"];
        var puuid = summoner["puuid"];

        const matchList = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&api_key=${process.env.RIOT_API_KEY}&count=${parseInt(input[2])}`).then(
            (response) => response.json()
        );

        var wins = 0;
        var losses = 0;
        var aramCounter = 0;

        for (let i = 0; i < parseInt(input[2]); i++) {
            var match = matchList[i];
            const matchDetails = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${match}?&api_key=${process.env.RIOT_API_KEY}`).then(
                (response) => response.json());
            if (typeof matchDetails["info"]["gameMode"] !== 'undefined') {
                if (matchDetails["info"]["gameMode"] == gamemode) {
                    aramCounter += 1;
                    for (let x = 0; x < 9; x++) {
                        if (matchDetails["metadata"]["participants"][x] == puuid) {
                            if (matchDetails["info"]["participants"][x]["win"] == true) {
                                wins += 1;
                            } 
                            if (matchDetails["info"]["participants"][x]["win"] == false){
                                losses += 1;
                            }
                        }
                    }
                }
            }
        }

        var winrate = (wins / aramCounter) * 100
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const embed = new MessageEmbed()
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${summoner["profileIconId"]}.png`)
            .setAuthor(`${summoner["name"]}`)
            .setTitle(`${gamemode} Winrate in ${aramCounter} games: **${Math.round(winrate)}%**`)
            .setColor(randomColor)
            .setFooter(`W${wins} L${losses}`)
        await message.channel.send(embed);
    },
};


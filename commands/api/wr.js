const apiKey = "RGAPI-a7f8dbe9-1ad5-490f-829d-b783a5a8660f";
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "wr",
    description: "lol winrate Usage -> ;wr <summoner name> <number of matches to filter through> <gamemode name>. Don't use spaces in summoner name.",
    async execute(message) {
        input = message.content.split(" ");
        if (input[1] == null || input[2] == null || input[3] == null || parseInt(input[2]) > 2000 || isNaN(input[2])) {
            message.channel.send("Usage: ;wr <summoner name> <number of matches to filter through> <gamemode name>. Don't use spaces in summoner name.");
            return;
        }

        var gamemode = input[3].toUpperCase();
        var summonerName = input[1].split('#')
        const summoner = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(summonerName[0])}/${summonerName[1]}?api_key=${apiKey}`).then(
            (response) => response.json()
        );

        var id = summoner["id"];
        var puuid = summoner["puuid"];

        const matchList = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&api_key=${apiKey}&count=${parseInt(input[2])}`).then(
            (response) => response.json()
        );

        var wins = 0;
        var losses = 0;
        var aramCounter = 0;
        var kills = 0;
        var deaths = 0;
        var assists = 0;
        var champs = [];

        for (let i = 0; i < parseInt(input[2]); i++) {
            var match = matchList[i];
            const matchDetails = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${match}?&api_key=${apiKey}`).then(
                (response) => response.json());
            if (typeof matchDetails["info"]["gameMode"] !== 'undefined') {
                if (matchDetails["info"]["gameMode"] == gamemode) {
                    aramCounter += 1;
                    for (let x = 0; x < 10; x++) {
                        if (matchDetails["metadata"]["participants"][x] == puuid) {
                            kills += parseInt(matchDetails["info"]["participants"][x]["kills"]);
                            deaths += parseInt(matchDetails["info"]["participants"][x]["deaths"]);
                            assists += parseInt(matchDetails["info"]["participants"][x]["assists"]);
                            champs.push(matchDetails["info"]["participants"][x]["championName"]);
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
        var kda = (kills + assists) / deaths
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            
        var counts = {}, max = 0, res;
            for (var v in champs) {
            counts[champs[v]] = (counts[champs[v]] || 0) + 1;
            if (counts[champs[v]] > max) { 
                max = counts[champs[v]];
                res = champs[v];
            }

            }
        var results = [];
        for (var k in counts){
        if (counts[k] == max){
            results.push(k);
        }
        }
        const summonerIcon = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${summoner["puuid"]}?api_key=${apiKey}`).then(
            (response) => response.json()
        );
        
    const indexedChampion = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/${results[0]}.json`
      ).then((response) => response.json());
      image = `http://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${indexedChampion["data"][`${results[0]}`]["image"]["full"]}`;
        const embed = new MessageEmbed()
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/${summonerIcon["profileIconId"]}.png`)
            .setAuthor(`${summonerIcon["name"]}`)
            .setTitle(`${gamemode} Winrate in ${aramCounter} games: **${Math.round(winrate)}%**`)
            .setColor(randomColor)
            .setFooter(`W${wins} L${losses}`)
            .setImage(image)
            .setDescription(`Overall KDA: ${kda}\n\nMost played champion:`)
        await message.channel.send(embed);
    },
};


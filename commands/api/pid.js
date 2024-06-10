const apiKey = "RGAPI-5363d67f-3136-4d1a-9408-d71c9bc7f317";
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pid",
    description: "Get Riot Player ID",
    async execute(message) {
        input = message.content.split(" ");
        if (input[1] == null) {
            message.channel.send("Usage: ;pid <summoner name>");
            return;
        }
        const summoner = await fetch(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURIComponent(input[1])}?api_key=${apiKey}`).then(
            (response) => response.json()
        );
        var id = summoner["id"];
        var puuid = summoner["puuid"];
        message.channel.send(`Puuid:\n${puuid}\nID:\n${id}`);     
    },
  };
  
  
const fetch = require("node-fetch");
    const { MessageEmbed } = require("discord.js");
    
    module.exports = {
        name: "genshin",
        description: "Cycles through the top posts on the NSFW Genshin Impact subreddit.",
        async execute(message) {
            let r = await fetch(
                `https://www.reddit.com/r/GenshinImpactNSFW/top.json?sort=top&show=all&t=all&after=${global.after2}`
              ).then((response) => response.json());
              global.counter2++;
              if (global.counter > 24) {
                global.after2 = r["data"]["after"];
                global.counter2 = -1;
                global.page2++;
              }
              var randomColor = Math.floor(Math.random()*16777215).toString(16);
              const embed = new MessageEmbed()
                .setAuthor(`Genshin NSFW (Top) | Page ${global.page2} | Post ${global.counter2}`)
                .setColor(randomColor)
                .setImage(r["data"]["children"][global.counter2]["data"]["url"])
                .setDescription(r["data"]["children"][global.counter2]["data"]["url"]);
                message.channel.send(embed);
        },
      };
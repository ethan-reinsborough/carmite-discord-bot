
    module.exports = {
        name: "tk",
        description: "Shows the Top Knit(s) (TAHM KENCH HAHA)",
        async execute(message) {
            let r = await fetch(
                `https://www.reddit.com/r/knitting/top.json?sort=top&show=all&t=all&after=${global.after}`
              ).then((response) => response.json());
              message.channel.send(r);
              global.counter++;
              if (global.counter > 24) {
                global.after = r["data"]["after"];
                global.counter = -1;
                global.page++;
              }
              const embed = new MessageEmbed()
                .setAuthor(`Knitting (Top) | Page ${global.page} | Post ${global.counter}`)
                .setColor("#d6428c")
                .setImage(r["data"]["children"][global.counter]["data"]["url"])
                .setDescription(r["data"]["children"][global.counter]["data"]["url"]);
                message.channel.send(embed);
        },
      };
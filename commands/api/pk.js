
  
  const { MessageEmbed, Message } = require("discord.js");
  const { Spawn } = require("pokecord");

  module.exports = {
      name: "pk",
      description: "Shows the Top Knit(s) (TAHM KENCH HAHA)",
      async execute(msg) {

            const pokemon = await Spawn().catch((e) => {});
            if (!pokemon) return msg.channel.send("Opps! Something went wrong :(");
            const filter = (m) => m.author.id === msg.author.id;
        
            const embed = new MessageEmbed()
              .setAuthor("Guess the pokemon")
              .setColor("#FFFF00")
              .setImage(pokemon.imageURL);
        
            await msg.channel.send(embed);
            msg.channel.send("THIS SHOULD BE THE IMAGE MFKER: " + pokemon.imageURL);
        
            msg.channel
              .awaitMessages(filter, {
                max: 1,
                error: ["time"],
                time: 15000,
              })
              .then((collected) => {
                const m = collected.first();
                if (
                  !m.content ||
                  m.content.toLowerCase() !== pokemon.name.toLowerCase()
                )
                  return msg.channel.send(
                    `❌ | Incorrect guess! The answer was **${pokemon.name}**.`
                  );
                return msg.channel.send(`✅ | Correct guess!`);
              })
              .catch(() => {
                msg.channel.send(
                  `❌ | You did not answer in time. The correct answer was **${pokemon.name}**!`
                );
              });
          
        
      },
    };
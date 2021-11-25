module.exports = {
    name: "e",
    description: "e/a tft duo mode command for items",
    async execute(message) {
        input = message.content.split(" ");

        if(input[1] == null || input[1].length > 2){
            message.channel.send("Usage: s = sword, t = tear, r = rod, v = vest, b = bow, gb = giants belt, g = glove, c = cloak");
            return;
        }

        for (let i = 0; i <= input.length; i++) {
            if(input[i] == "s"){
                input[i] = "<@!913452398876446741>"
            }
            if(input[i] == "t"){
                input[i] = "<@!913452295612694610>"
            }
            if(input[i] == "r"){
                input[i] = "<@!913452341225730119>"
            }
            if(input[i] == "v"){
                input[i] = "<@!9134523879251231129>"
            }
            if(input[i] == "b"){
                input[i] = "<@!913452318173851698>"
            }
            if(input[i] == "gb"){
                input[i] = "<@!913452364265058314>"
            }
            if(input[i] == "g"){
                input[i] = "<@!913452308493381632>"
            }
            if(input[i] == "c"){
                input[i] = "<@!913452327590064138>"
            }
        } 

        var opt1 = input[1];
        var opt2 = input[2];
        message.channel.send("<@!180787488950976523>").then(sentEmbed => {
            sentEmbed.react(opt1);
            sentEmbed.react(opt2);
        })
    },
  };
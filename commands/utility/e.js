module.exports = {
    name: "e",
    description: "ethan/ayumi tft duo mode command for items",
    async execute(message) {
        input = message.content.split(" ");

        if(input[1] == null || input[1].length > 2){
            message.channel.send("Usage: s = sword, t = tear, r = rod, v = vest, b = bow, gb = giants belt, g = glove, c = cloak");
            return;
        }

        for (let i = 0; i <= input.length; i++) {
            if(input[i] == "s"){
                input[i] = "<:sword:951920572642787419>"
            }
            if(input[i] == "t"){
                input[i] = "<:tear:951920630025031821>"
            }
            if(input[i] == "r"){
                input[i] = "<:rod:951920630025031821>"
            }
            if(input[i] == "v"){
                input[i] = "<:cvest:951920630025031821>"
            }
            if(input[i] == "b"){
                input[i] = "<:bow:951920630025031821>"
            }
            if(input[i] == "gb"){
                input[i] = "<:giants:951920630025031821>"
            }
            if(input[i] == "g"){
                input[i] = "<:gloves:951920630025031821>"
            }
            if(input[i] == "c"){
                input[i] = "<:cloak:951920630025031821>"
            }
        } 
        message.delete();
        var opt1 = input[1];
        var opt2 = input[2];
        message.channel.send("<@!180787488950976523>").then(sentMessage => {
            sentMessage.react(opt1);
            sentMessage.react(opt2);
            sentMessage.react("<:gold-tft:913479929058959401>");
        })
    },
  };
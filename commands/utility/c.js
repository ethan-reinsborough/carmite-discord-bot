module.exports = {
    name: "c",
    description: "ethan/ayumi tft duo mode command for items",
    async execute(message) {
        input = message.content.split(" ");

        if(input[1] == null || input[1].length > 2){
            message.channel.send("Usage: s = sword, t = tear, r = rod, v = vest, b = bow, gb = giants belt, g = glove, c = cloak");
            return;
        }

        for (let i = 0; i <= input.length; i++) {
            if(input[i] == "s"){
                input[i] = "<:sword:913452398876446741>"
            }
            if(input[i] == "t"){
                input[i] = "<:tear:913452295612694610>"
            }
            if(input[i] == "r"){
                input[i] = "<:rod:913452341225730119>"
            }
            if(input[i] == "v"){
                input[i] = "<:cvest:915130817943048213>"
            }
            if(input[i] == "b"){
                input[i] = "<:bow:913452318173851698>"
            }
            if(input[i] == "gb"){
                input[i] = "<:giants:913452364265058314>"
            }
            if(input[i] == "g"){
                input[i] = "<:gloves:913452308493381632>"
            }
            if(input[i] == "c"){
                input[i] = "<:cloak:913452327590064138>"
            }
        } 
        message.delete();
        var opt1 = input[1];
        var opt2 = input[2];
        message.channel.send("<@!360999187485163520>").then(sentMessage => {
            sentMessage.react(opt1);
            sentMessage.react(opt2);
            sentMessage.react("<:gold-tft:913479929058959401>");
        })
    },
  };
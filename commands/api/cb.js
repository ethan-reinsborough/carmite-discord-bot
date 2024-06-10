const cleverbot = require("cleverbot-free");

module.exports = {
    name: "cb",
    description: "Free cleverbot test",
    async execute(message) {
        let input = message.content.split(" ");
        input.shift();
        global.cb.push(input);
        cleverbot(input, global.cb).then(response => {
            message.channel.send(response);
            global.cb.push(response);
        });
    },
  };
  
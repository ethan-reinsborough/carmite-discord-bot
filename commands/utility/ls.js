let interval = null;
let cont = false;
module.exports = {
    name: "ls",
    description: "LOOP THAT COMMAND BOI",
    async execute(message) {
        global.cont = true;
        input = message.content.split(" ");
          global.interval = setInterval(() => {
            if (global.cont === true) {
            message.channel.send(input[1]);
            }
          }, 12500);
    },
  };
  
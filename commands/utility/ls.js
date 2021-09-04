let interval = null;
let cont = false;
module.exports = {
    name: "ls",
    description: "LOOP THAT COMMAND BOI",
    async execute(message) {
        cont = true;
        input = message.content.split(" ");
          interval = setInterval(() => {
            if (cont === true) {
            message.channel.send(input[1]);
            counter3++
            }
          }, 12500);
    },
  };
  
let interval = null;
let cont = false;
module.exports = {
    name: "loop start",
    description: "LOOP THAT COMMAND BOI",
    async execute(message) {
        cont = true;
        input = msg.content.split(" ");
          interval = setInterval(() => {
            if (cont === true) {
            msg.channel.send(input[1]);
            counter3++
            }
          }, 12500);
    },
  };
  
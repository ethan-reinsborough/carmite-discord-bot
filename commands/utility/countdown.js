let interval = null;
let cont = false;
module.exports = {
    name: "cd",
    description: "Countdown",
    async execute(message) {
        input = message.content.split(" ");
        var minutes = input[1];
          global.interval = setInterval(() => {
            minutes -= 1;
            if (minutes >= 0) {
            message.channel.send(`${minutes} minutes remaining until REALM OF THE MAD GOD.`);
            if(minutes == 0){
              message.channel.send("TIME IS UP ROTMG TIME <@140910898364547072> <@295111955142934528>");
            }
            }
          }, 60000);
    },
  };
  
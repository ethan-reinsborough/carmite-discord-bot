module.exports = {
    name: "rr",
    description: "Reset reddit. Resets value of reddit counters to start from the beginning.",
    async execute(message) {
        global.counter = 0;
        global.after = "";
        global.page = 1;
        
        global.counter2 = 0;
        global.after2 = "";
        global.page2 = 1;
        message.channel.send("Counters reset.");
    },
  };
  
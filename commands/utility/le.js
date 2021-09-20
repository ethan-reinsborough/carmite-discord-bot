
  
  module.exports = {
    name: "le",
    description: "PLS NO MORE",
    async execute(message) {
    message.channel.send("Stopping the nightmare...");
    clearInterval(global.interval);
    global.interval = null;
    },
  };
  

  
  module.exports = {
    name: "le",
    description: "PLS NO MORE",
    async execute(message) {
        message.channel.send("Stopping the nightmare...");
    cont = false;
    clearInterval(interval);
    interval = null;
    input = null;
    counter3 = 0;
    message.channel.send(`Interval set to: ${interval}. Loop set to: ${cont}. Input is now ${input}`);
    },
  };
  
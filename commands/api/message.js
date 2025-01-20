module.exports = {
    name: "message",
    description: "Sends a message to a specific user.",
    async execute(message, args) {
      // User ID of the person to message
      const userId = '667437548628475904';
  
      // Join the arguments into a single message
      const messageContent = args.join(' ');
  
      try {
        // Fetch the user by ID
        const user = await message.client.users.fetch(userId);
  
        if (!messageContent) {
          return message.reply('Please provide a message to send.');
        }
  
        // Send the message to the user
        await user.send(messageContent);
        message.reply(`Your message has been sent to <@${userId}>!`);
      } catch (error) {
        console.error('Error sending message:', error);
        message.reply('There was an error sending the message.');
      }
    },
  };
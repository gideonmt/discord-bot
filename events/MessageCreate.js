const messageFunctions = require("../functions/messageFunctions");

module.exports = {
    handleMessageCreate: async (message, client) => {
        if (!message.author.bot || message.channel.type === 1) {
            console.log(`${message.author.tag} sent a message in DMs: ${message.content}`);
        } else if (!message.author.bot || message.channel.type !== 1) {
            messageFunctions(message, client);
        } else
            return;
    }
}

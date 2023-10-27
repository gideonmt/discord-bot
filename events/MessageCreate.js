const messageFunctions = require("../functions/messageFunctions");
const handleModmail = require("../functions/modmail");

module.exports = {
    handleMessageCreate: async (message, client) => {
        if (message.channel.type === 1 && !message.author.bot) {
            return handleModmail.handleDM(message, client);
        } else if (!message.author.bot) {
            return messageFunctions(message, client);
        } else {
            return;
        }
    }
}

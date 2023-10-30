const messageFunctions = require("../functions/messageFunctions");
const handleDm = require("../functions/modmail/handleDm");

module.exports = {
    handleMessageCreate: async (message, client) => {
        if (message.channel.type === 1 && !message.author.bot) {
            return handleDm(message, client);
        } else if (!message.author.bot) {
            return messageFunctions(message, client);
        } else {
            return;
        }
    }
}

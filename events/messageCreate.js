module.exports = {
    handleMessageCreate: async (message, client) => {
        if (message.author.bot) return;
        if (message.content.toLowerCase() === 'hello', 'hi', 'hey') { // for testing remove later
            message.reply('Hello!');
        }
    }
}
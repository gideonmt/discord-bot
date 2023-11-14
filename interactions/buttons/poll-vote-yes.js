const { pollVote } = require("../../functions/db/db");

module.exports = (interaction, client) => {
    const messageObject = interaction.message;
    const user = interaction.user.id;

    pollVote(messageObject, user, 'yes', client);

    interaction.reply({ content: `Vote recorded!`, ephemeral: true })
}
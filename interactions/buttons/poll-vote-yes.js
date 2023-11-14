const { pollVote } = require("../../functions/polls");

module.exports = (interaction) => {
    const messageObject = interaction.message;
    const user = interaction.user.id;

    pollVote(messageObject, user, 'yes');

    interaction.reply({ content: `Vote recorded!`, ephemeral: true })
}
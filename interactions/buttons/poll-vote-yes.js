const { pollVote } = require("../../functions/db/db");

module.exports = (interaction) => {
    const message = interaction.message.id;
    const user = interaction.user.id;

    pollVote(message, user, 'yes');

    interaction.reply({ content: `Vote recorded!`, ephemeral: true })
}
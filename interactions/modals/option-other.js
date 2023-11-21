const { pollVote } = require("../../functions/polls");

module.exports = (interaction) => {
    const message = interaction.message;
    const user = interaction.user.id;
    const textInput = interaction.fields.getTextInputValue("otherInput");
    const option = [ `Other: ${textInput}` ];

    pollVote(message, user, option, false);

    interaction.reply({ content: `Vote recorded!`, ephemeral: true })
}
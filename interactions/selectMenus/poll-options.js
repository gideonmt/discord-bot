const { pollVote } = require("../../functions/polls");

module.exports = (interaction) => {
    const messageObject = interaction.message;
    const user = interaction.user.id;
    const optionsValue = interaction.values
    const option = interaction.message.components[0].components[0].data.options.filter(option => optionsValue.includes(option.value)).map(option => option.label)
    const multiple = interaction.message.components[0].components[0].data.max_values > 1 ? true : false

    pollVote(messageObject, user, option, multiple);

    interaction.reply({ content: `Vote recorded!`, ephemeral: true })
}
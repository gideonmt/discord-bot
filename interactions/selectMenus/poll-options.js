const { pollVote } = require("../../functions/polls");
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")

module.exports = (interaction) => {
    const messageObject = interaction.message;
    const user = interaction.user.id;
    const optionsValue = interaction.values
    const option = interaction.message.components[0].components[0].data.options.filter(option => optionsValue.includes(option.value)).map(option => option.label)
    const multiple = interaction.message.components[0].components[0].data.max_values > 1 ? true : false

    if (option.includes('Other')) {
        const modal = new ModalBuilder()
            .setCustomId(`option-other`)
            .setTitle('Other option')
        
        const otherInput = new TextInputBuilder()
            .setCustomId('otherInput')
            .setLabel("Your option:")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your option here...')
            .setRequired(true)
            .setMinLength(1)
        
        const actionRow = new ActionRowBuilder().addComponents(otherInput);
        modal.addComponents(actionRow);
        return interaction.showModal(modal);
    }

    pollVote(messageObject, user, option, multiple);

    interaction.reply({ content: `Vote recorded!`, ephemeral: true })
}
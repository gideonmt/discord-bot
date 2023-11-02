const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")

module.exports = async (interaction) => {
    const replyModal = new ModalBuilder()
        .setCustomId(`modal-${interaction.customId}`)
        .setTitle('Reply to Modmail')

    const replyModalInput = new TextInputBuilder()
        .setCustomId('replyModalInput')
        .setLabel("Your reply:")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Reply here...')
        .setRequired(true)
        .setMaxLength(2000)
        .setMinLength(1)

    const actionRow = new ActionRowBuilder().addComponents(replyModalInput);

    replyModal.addComponents(actionRow);

    await interaction.showModal(replyModal);
}
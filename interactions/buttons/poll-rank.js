const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function pollRankButton(interaction) {
    const id = interaction.customId.split('-')[2];

    const modal = new ModalBuilder()
        .setCustomId(`poll-${id}-options`)
        .setTitle('Rank the options')

    const options = interaction.message.embeds[0].description.split('\n').map(option => option.split(' ')[0]);

    const rankInput = new TextInputBuilder()
        .setCustomId('rankInput')
        .setLabel("Your rank:")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('1, 2, 3, etc.')
        .setRequired(true)
        .setMinLength(( options.length * 3) - 2)
        .setMaxLength(( options.length * 3) - 2)

    const actionRow = new ActionRowBuilder().addComponents(rankInput);

    modal.addComponents(actionRow);

    await interaction.showModal(modal);
}

module.exports = { pollRankButton };
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = async (interaction) => {
    const modal = new ModalBuilder()
        .setCustomId('settings-welcome')
        .setTitle('Member Join Settings');

    const welcomeChannelId = new TextInputBuilder()
        .setCustomId('welcome-channel')
        .setLabel("Channel ID for welcome messages.")
        .setPlaceholder("Leave blank to disable")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);
    
    const welcomeMessages = new TextInputBuilder()
        .setCustomId('welcome-messages')
        .setLabel('Welcome messages. Add up to 50.')
        .setPlaceholder('Separate messages with new lines. Use ${user} to mention the user, ${server} for the server name.')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

    const deleteWelcomeMessages = new TextInputBuilder()
        .setCustomId('delete-welcome-messages')
        .setLabel('Delete welcome message after amount of time.')
        .setPlaceholder('Leave blank to disable. Use seconds.')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    const newMemberRoleId = new TextInputBuilder()
        .setCustomId('new-member-role')
        .setLabel('New member role ID.')
        .setPlaceholder('Leave blank to disable')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    const firstActionRow = new ActionRowBuilder().addComponents(welcomeChannelId);
    const secondActionRow = new ActionRowBuilder().addComponents(welcomeMessages);
    const thirdActionRow = new ActionRowBuilder().addComponents(deleteWelcomeMessages);
    const fourthActionRow = new ActionRowBuilder().addComponents(newMemberRoleId);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

    await interaction.showModal(modal);
};

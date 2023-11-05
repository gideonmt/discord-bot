const modmailChannel = require('./modmailChannel');

module.exports = async (interaction, client) => {
    const guildId = interaction.customId.split('-')[1];
    const guild = await client.guilds.cache.get(guildId);

    const buttonMessage = interaction.message;
    const message = await buttonMessage.fetchReference();

    await modmailChannel(guild, message, client);

    const messageSent = {
        author: {
            name: `${interaction.user.tag}`,
            icon_url: `${interaction.user.displayAvatarURL()}`
        },
        color: 0x00ff00,
        description: message.content,
        footer: {
            text: `${guild.name} | ${guildId}`,
            icon_url: `${guild.iconURL()}`
        }
    }

    await interaction.reply({ content: 'Modmail Sent!', embeds: [messageSent] })
}
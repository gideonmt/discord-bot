const modmailChannel = require('./modmailChannel');

module.exports = async (interaction, client) => {
    const guildId = interaction.customId.split('-')[1];
    const guild = client.guilds.cache.get(guildId);
    modmailChannel(guild, interaction);
}
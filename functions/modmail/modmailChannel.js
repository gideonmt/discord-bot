const notifyMods = require('./notifyMods');
module.exports = async (guild, interaction) => {
    const message = interaction.message;
    const allChannels = guild.channels.cache;
    
    const modmailChannels = allChannels.filter(channel => channel.name === 'modmail' && channel.type === 15);
    const modmailChannel = modmailChannels.first();
    if (!modmailChannel) {
        guild.channels.create({
            name: 'modmail',
            type: 15,
            reason: 'Modmail channel creation.'
        }).then(modmailChannel => {
            notifyMods(modmailChannel, message, guild);
        });
        return;
    }
    return notifyMods(modmailChannel, message, guild);
};
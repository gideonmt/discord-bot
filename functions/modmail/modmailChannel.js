const notifyMods = require('./notifyMods');
module.exports = async (guild, message) => {
    const modmailChannels = guild.channels.cache.filter(channel => channel.name === 'modmail' && channel.type === 15);
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
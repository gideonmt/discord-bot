const notifyMods = require('./notifyMods');
module.exports = async (guild, message) => {
    const modmailChannel = guild.channels.cache.find(channel => { channel.name === 'modmail' && channel.type === 15 });
    console.log(modmailChannel);
    if (!modmailChannel) {
        guild.channels.create({
            name: 'modmail',
            type: 15,
            reason: 'Modmail channel creation.'
        }).then(modmailChannel => {
            notifyMods(modmailChannel);
        });
        return;
    }
    return notifyMods(modmailChannel, message);
};
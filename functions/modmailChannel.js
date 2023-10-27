const modmail = require("./modmail");

module.exports = async (guild) => {
    const modmailChannel = guild.channels.cache.find(channel => { channel.name === 'modmail' && channel.type === 15 });
    console.log(modmailChannel);
    if (!modmailChannel) {
        guild.channels.create({
            name: 'modmail',
            type: 15,
            reason: 'Modmail channel creation.'
        }).then(modmailChannel => {
            modmail.notifyMods(modmailChannel);
        });
        return;
    }
    return modmail.notifyMods(modmailChannel);
};
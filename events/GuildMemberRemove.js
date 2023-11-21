function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function replace(leaveMessages, oldMember, guild, client) {
    const replacements = {
        '{client.mention}': `<@${client.user.id}>`,
        '{client.username}': `${client.user.username}`,
        '{client.id}': `${client.user.id}`,
        '{client.tag}': `${client.user.tag}`,
        '{user.mention}': `<@${oldMember.id}>`,
        '{user.username}': `${oldMember.username}`,
        '{user.id}': `${oldMember.id}`,
        '{user.tag}': `${oldMember.tag}`,
        '{guild.name}': `${guild.name}`,
        '{guild.id}': `${guild.id}`,
        '{guild.memberCount}': `${guild.memberCount}`,
    }

    for (const placeholder in replacements) {
        leaveMessages = leaveMessages.replace(placeholder, replacements[placeholder]);
    }
}

module.exports = {
    handleMemberLeave: function (member, client) {
        const config = require('../config/config');
        const settings = config(member.guild.id);
        const leaveEnabled = settings.leaveEnabled;
        const channel = settings.leaveChannel;
        const leaveMessages = settings.leaveMessages;
        if (leaveEnabled && channel && leaveMessages) {
            let oldMember = member.user;
            let guild = member.guild;
            let leaveChannel = member.guild.channels.cache.get(channel);

            let leaveMessage = leaveMessages[randomIntFromInterval(0, leaveMessages.length - 1)];
            leaveMessage = replace(leaveMessage, oldMember, guild, client)

            leaveChannel.send(leaveMessage);
        }
    }
};

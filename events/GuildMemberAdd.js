function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function replace(welcomeMessages, newMember, guild, client) {
    const replacements = {
        '{client.mention}': `<@${client.user.id}>`,
        '{client.username}': `${client.user.username}`,
        '{client.id}': `${client.user.id}`,
        '{client.tag}': `${client.user.tag}`,
        '{user.mention}': `<@${newMember.id}>`,
        '{user.username}': `${newMember.username}`,
        '{user.id}': `${newMember.id}`,
        '{user.tag}': `${newMember.tag}`,
        '{guild.name}': `${guild.name}`,
        '{guild.id}': `${guild.id}`,
        '{guild.memberCount}': `${guild.memberCount}`,
    }

    for (const placeholder in replacements) {
        welcomeMessages = welcomeMessages.replace(placeholder, replacements[placeholder]);
    }
}

module.exports = {
    handleMemberJoin: function (member, client) {
        const config = require('../config/config');
        const settings = config(member.guild.id);
        const welcomeEnabled = settings.welcomeEnabled;
        const channel = settings.welcomeChannel;
        const welcomeMessages = settings.welcomeMessages;
        const newMemberRoleEnabled = settings.newMemberRoleEnabled;
        const newMemberRoleId = settings.newMemberRoleId;

        if (newMemberRoleEnabled && newMemberRoleId) {
            let welcomeRole = member.guild.roles.cache.get(newMemberRoleId);

            member.roles.add(welcomeRole);
        }

        if (welcomeEnabled && channel && welcomeMessages) {
            let newMember = member.user;
            let guild = member.guild;
            let welcomeChannel = member.guild.channels.cache.get(channel);

            let welcomeMessage = welcomeMessages[randomIntFromInterval(0, welcomeMessages.length - 1)];
            welcomeMessage = replace(welcomeMessage, newMember, guild, client)

            welcomeChannel.send(welcomeMessage);
        }
    }
};

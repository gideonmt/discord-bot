const fs = require('fs');
const settingsData = fs.readFileSync('settings.json', 'utf8');
const settings = JSON.parse(settingsData);
const welcomeEnabled = settings.welcomeEnabled;
const channel = settings.welcomeChannel;
const welcomeMessages = settings.welcomeMessages;
const newMemberRoleEnabled = settings.newMemberRoleEnabled;
const newMemberRoleId = settings.newMemberRoleId;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    handleMemberJoin: function (guildMember) {
        if (newMemberRoleEnabled && newMemberRoleId) {
            let welcomeRole = guildMember.guild.roles.cache.get(newMemberRoleId);

            guildMember.roles.add(welcomeRole);
        }

        if (welcomeEnabled && channel && welcomeMessages) {
            let newMemberId = guildMember.user.id;
            let welcomeChannel = guildMember.guild.channels.cache.get(channel);

            let welcomeMessage = welcomeMessages[randomIntFromInterval(0, welcomeMessages.length - 1)];
            welcomeMessage = welcomeMessage.replace('{user}', `<@${newMemberId}>`);

            welcomeChannel.send(welcomeMessage);
        }
    }
};

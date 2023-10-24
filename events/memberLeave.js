const fs = require('fs');
const settingsData = fs.readFileSync('settings.json', 'utf8');
const settings = JSON.parse(settingsData);
const leaveEnabled = settings.leaveEnabled;
const channel = settings.leaveChannel;
const leaveMessages = settings.leaveMessages;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    handleMemberLeave: function (guildMember) {
        if (leaveEnabled && channel && leaveMessages) {
            let memberName = guildMember.user.username;
            let leaveChannel = guildMember.guild.channels.cache.get(channel);

            let leaveMessage = leaveMessages[randomIntFromInterval(0, leaveMessages.length - 1)];
            leaveMessage = leaveMessage.replace('{user}', memberName);

            leaveChannel.send(leaveMessage);
        }
    }
};

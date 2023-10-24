const { Events } = require('discord.js');

module.exports = (client) => {
    const memberJoin = require('./memberJoin');
    const memberLeave = require('./memberLeave');

    client.on(Events.GuildMemberAdd, async member => {
        memberJoin.handleMemberJoin(member, client);
    });

    client.on(Events.GuildMemberRemove, async member => {
        memberLeave.handleMemberLeave(member, client);
    });
}
const { Events } = require('discord.js');

module.exports = (client) => {
    const memberJoin = require('./memberJoin');
    const memberLeave = require('./memberLeave');
    const messageCreate = require('./messageCreate');

    client.on(Events.GuildMemberAdd, async member => {
        memberJoin.handleMemberJoin(member, client);
    });

    client.on(Events.GuildMemberRemove, async member => {
        memberLeave.handleMemberLeave(member, client);
    });

    client.on(Events.MessageCreate, async message => {
        messageCreate.handleMessageCreate(message, client);
    });
}
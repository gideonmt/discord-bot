const { Events } = require('discord.js');

module.exports = (client) => {
    const memberJoin = require('./memberJoin');
    const memberLeave = require('./memberLeave');
    const messageCreate = require('./messageCreate');
    const messageReact = require('./messageReact');

    client.on(Events.GuildMemberAdd, async member => {
        memberJoin.handleMemberJoin(member, client);
    });

    client.on(Events.GuildMemberRemove, async member => {
        memberLeave.handleMemberLeave(member, client);
    });

    client.on(Events.MessageCreate, async message => {
        messageCreate.handleMessageCreate(message, client);
    });

    client.on(Events.MessageReactionAdd, async (reaction) => {
        messageReact.handleStarboard(reaction, client);
    });
}
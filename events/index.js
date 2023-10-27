const { Events } = require('discord.js');

module.exports = (client) => {
    const GuildMemberAdd = require('./GuildMemberAdd');
    const GuildMemberRemove = require('./GuildMemberRemove');
    const MessageCreate = require('./MessageCreate');
    const MessageReactionAdd = require('./MessageReactionAdd');

    client.on(Events.GuildMemberAdd, async member => {
        GuildMemberAdd.handleMemberJoin(member, client);
    });

    client.on(Events.GuildMemberRemove, async member => {
        GuildMemberRemove.handleMemberLeave(member, client);
    });

    client.on(Events.MessageCreate, async message => {
        MessageCreate.handleMessageCreate(message, client);
    });

    client.on(Events.MessageReactionAdd, async (reaction) => {
        MessageReactionAdd.handleStarboard(reaction, client);
    });
}
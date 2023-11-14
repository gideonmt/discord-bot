const { Events } = require('discord.js');

module.exports = (client) => {
    const autocomplete = require('./autocomplete')
    const commands = require('./commands')
    const buttons = require('./buttons')
    const modals = require('./modals')

    commands.handleCommands(client);
    
    client.on(Events.InteractionCreate, async interaction => {
        if (interaction.isChatInputCommand()) { commands.handleChatInputCommand(interaction, client) }
        else if (interaction.isAutocomplete()) { autocomplete.handleAutocomplete(interaction, client) }
        else if (interaction.isButton()) { buttons.handleButtons(interaction, client) }
        else if (interaction.isStringSelectMenu()) { buttons.handleSelectMenu(interaction, client) }
        else if (interaction.isModalSubmit()) { modals.handleModalSubmit(interaction, client) }
    });
};
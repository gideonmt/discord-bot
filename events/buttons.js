module.exports = {
    handleButtons: async (interaction) => {
        if (interaction.customId.includes('settings-welcome')) {interaction.reply({ content: `settings for welcome`, ephemeral: true })}
        else if (interaction.customId.includes('settings-autoreply')) {interaction.reply({ content: `settings for autoreply`, ephemeral: true })}
        else {interaction.reply({ content: `Command not found.`, ephemeral: true })}
    }
};

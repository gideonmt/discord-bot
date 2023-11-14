const fs = require('fs');
const path = require('path');
const guildButton = require('../functions/modmail/guildButton');
const replyButton = require('../functions/modmail/replyButton');
const { pollRankButton } = require('../interactions/buttons/poll-rank')

module.exports = {
    handleButtons: async (interaction, client) => {
        const buttonId = interaction.customId;

        const filePath = path.join(__dirname, '..', 'interactions', 'buttons', `${buttonId}.js`);

        if (fs.existsSync(filePath)) {
            try {
                const buttonHandler = require(filePath);
                if (typeof buttonHandler === 'function') {
                    await buttonHandler(interaction, client);
                } else {
                    interaction.reply({
                        content: `Invalid button command file. ButtonId: ${buttonId}`,
                        ephemeral: true,
                    });
                }
            } catch (error) {
                console.error(error);
                interaction.reply({
                    content: `Error executing the button command. ButtonId: ${buttonId}`,
                    ephemeral: true,
                });
            }
        } else if (buttonId.startsWith('modmail-')) {
            guildButton(interaction, client);
        } else if (buttonId.startsWith('reply-')) {
            replyButton(interaction, client);
        } else if (buttonId.startsWith('poll-rank-')) {
            pollRankButton(interaction);
        } else {
            interaction.reply({
                content: `Button command not found. ButtonId: ${buttonId}`,
                ephemeral: true,
            });
        }
    },
    handleSelectMenu: async (interaction, client) => {
        const selectMenuId = interaction.customId;

        const filePath = path.join(__dirname, '..', 'interactions', 'selectMenus', `${selectMenuId}.js`);

        if (fs.existsSync(filePath)) {
            try {
                const selectMenuHandler = require(filePath);
                if (typeof selectMenuHandler === 'function') {
                    await selectMenuHandler(interaction, client);
                } else {
                    interaction.reply({
                        content: `Invalid Select Menu command file. selectMenuId: ${selectMenuId}`,
                        ephemeral: true,
                    });
                }
            } catch (error) {
                console.error(error);
                interaction.reply({
                    content: `Error executing the Select Menu command. selectMenuId: ${selectMenuId}`,
                    ephemeral: true,
                });
            }
        } else {
            interaction.reply({
                content: `Select Menu command not found. selectMenuId: ${selectMenuId}`,
                ephemeral: true,
            });
        }
    }
};

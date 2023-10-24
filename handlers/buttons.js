const fs = require('fs');
const path = require('path');

module.exports = {
    handleButtons: async (interaction) => {
        const buttonId = interaction.customId;

        const filePath = path.join(__dirname, '..', 'interactions', 'buttons', `${buttonId}.js`);

        if (fs.existsSync(filePath)) {
            try {
                const buttonHandler = require(filePath);
                if (typeof buttonHandler === 'function') {
                    await buttonHandler(interaction);
                } else {
                    interaction.reply({
                        content: 'Invalid button command file.',
                        ephemeral: true,
                    });
                }
            } catch (error) {
                console.error(error);
                interaction.reply({
                    content: 'Error executing the button command.',
                    ephemeral: true,
                });
            }
        } else {
            interaction.reply({
                content: 'Button command not found.',
                ephemeral: true,
            });
        }
    }
};

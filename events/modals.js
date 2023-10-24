const fs = require('fs');
const path = require('path');

module.exports = {
    handleModalSubmit: async (interaction) => {
        const modalId = interaction.customId;

        const filePath = path.join(__dirname, '..', 'interactions', 'modals', `${modalId}.js`);

        if (fs.existsSync(filePath)) {
            try {
                const modalHandler = require(filePath);
                if (typeof modalHandler === 'function') {
                    await modalHandler(interaction);
                } else {
                    interaction.reply({
                        content: 'Invalid modal command file.',
                        ephemeral: true,
                    });
                }
            } catch (error) {
                console.error(error);
                interaction.reply({
                    content: 'Error executing the modal command.',
                    ephemeral: true,
                });
            }
        } else {
            interaction.reply({
                content: 'Modal command not found.',
                ephemeral: true,
            });
        }
    }
};
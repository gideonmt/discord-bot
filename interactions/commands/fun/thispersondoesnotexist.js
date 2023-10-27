const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thispersondoesnotexist')
		.setDescription('Sends a random image of a person that does not exist.'),
	async execute(interaction) {
        const embed = {
            title: `This Person Does Not Exist`,
            url: `https://thispersondoesnotexist.com/`,
            image: {
                url: `https://thispersondoesnotexist.com/`,
            }
        };

		return interaction.reply({ embeds: [embed] });
	},
};

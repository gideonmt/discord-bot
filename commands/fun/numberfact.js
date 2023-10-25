const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('numberfact')
		.setDescription('Get a random fact about a number.')
        .addStringOption(option => option.setName('number').setDescription('The number to get a fact about.')),
	async execute(interaction) {
        const number = interaction.options.getString('number') || 'random';
        const link = `http://numbersapi.com/${number}/trivia`;

        const fact = await fetch(link).then(response => response.text());

        const embed = {
            title: `Number Fact`,
            url: link,
            description: fact,
        };

		return interaction.reply({ embeds: [embed] });
	},
};

const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dadjoke')
		.setDescription('Sends a random dad joke.'),
	async execute(interaction) {
        // "Accept: application/json" https://icanhazdadjoke.com/
        const joke = await fetch(`https://icanhazdadjoke.com/`, {
            headers: {
                "Accept": "application/json"
            }
        }).then(response => response.json());

        const embed = {
            title: `Dad Joke`,
            description: joke.joke,
            url: `https://icanhazdadjoke.com/j/${joke.id}`,
        };

		return interaction.reply({ embeds: [embed] });
	},
};

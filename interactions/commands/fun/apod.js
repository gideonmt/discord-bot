const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apod')
		.setDescription('Sends the Astronomy Picture of the Day.'),
	async execute(interaction) {
        const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
        const image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`).then(response => response.json());
        const embed = {
            title: image.title + " | " + image.date,
            description: image.explanation,
            image: {
                url: image.hdurl,
            }
        };

		return interaction.reply({ embeds: [embed] });
	},
};

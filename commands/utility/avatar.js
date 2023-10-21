const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		const member = interaction.options.getUser('target') || interaction.user;
		const embed = {
			title: `${member.username}'s Avatar`,
			image: {
				url: member.displayAvatarURL(),
			},
			color: member.displayColor === "#000000" ? "#ffffff" : member.displayColor,
		};

		return interaction.reply({ embeds: [embed] });
	},
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member.')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.permissions.has('KickMembers')) {
			return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
		}

		const member = interaction.options.getMember('target');

		await member.kick();
		return interaction.reply({ content: `You kicked: **${member.user.username}**`, ephemeral: true });
	},
};

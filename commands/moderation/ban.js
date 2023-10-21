const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member.')
		.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.permissions.has('BanMembers')) {
			return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
		}

		const member = interaction.options.getMember('target');


		await interaction.guild.members.ban(member);
		return interaction.reply({ content: `You banned: **${member.user.username}**`, ephemeral: true });
	},
};

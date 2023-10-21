const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member.')
		.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		await guild.members.ban(member);
		return interaction.reply({ content: `You banned: ${member.user.username}`, ephemeral: true });
	},
};

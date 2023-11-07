const { SlashCommandBuilder } = require('discord.js');
const { timeToMs } = require('../../../functions/timeToMs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Ban a member.')
				.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
				.addStringOption(option => option.setName('reason').setDescription('The reason for the ban.'))
				.addStringOption(option => option.setName('delete-messages').setDescription('The number of days to delete messages from.'))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Unban a member.')
				.addStringOption(option => option.setName('target').setDescription('The member to unban').setRequired(true).setAutocomplete(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('list')
				.setDescription('List banned members.')
		),
	async autocomplete(interaction) {
		const subcommand = interaction.options.getSubcommand();
		if (subcommand === 'remove') {
			const focusedValue = interaction.options.getFocused();

			const bannedMembers = await interaction.guild.bans.fetch();

			const filtered = bannedMembers.filter(member => member.user.username.startsWith(focusedValue));
			await interaction.respond(
				filtered.map(choice => ({ name: choice.user.username, value: choice.user.username })),
			);
		}
	},
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		if (!interaction.member.permissions.has('BanMembers')) {
			return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
		}

		if (subcommand === 'list') {
			const bannedMembers = await interaction.guild.bans.fetch();

			if (bannedMembers.size === 0) {
				return interaction.reply({ content: "There aren't any banned members.", ephemeral: true });
			}
			
			const embed = {
				title: `Banned Members`,
				description: `Here are the banned members:`,
				fields:
					bannedMembers.map(member => {
						return {
							name: member.user.username,
							value: `Reason: ${member.reason || 'No reason provided.'}`,
						}
					})
			};

			return interaction.reply({ embeds: [embed] });
		} else if (subcommand === 'remove') {
			const target = interaction.options.getString('target');

			const bannedMembers = await interaction.guild.bans.fetch();
			const bannedMember = bannedMembers.find(member => member.user.username === target);

			if (!bannedMember) {
				return interaction.reply({ content: "That member isn't banned.", ephemeral: true });
			}

			await interaction.guild.members.unban(bannedMember.user.id);
			return interaction.reply({ content: `You unbanned: **${bannedMember.user.username}**`, ephemeral: true });
		} else if (subcommand === 'add') {
			const member = interaction.options.getMember('target');
			const reason = interaction.options.getString('reason') || 'No reason provided.';
			const time = interaction.options.getString('delete-messages');

			if (time) {
				const timeMs = timeToMs(time);
				const deleteMessageSeconds = timeMs / 1000;
				if (deleteMessageSeconds > 604800) {
					return interaction.reply({ content: "You can't delete messages for longer than 7 days.", ephemeral: true });
				}
				await interaction.guild.members.ban(member, { reason: reason, deleteMessageSeconds: deleteMessageSeconds });
				return interaction.reply({ content: `You banned: **${member.user.username}**`, ephemeral: true });
			} else {
				await interaction.guild.members.ban(member, { reason: reason });
				return interaction.reply({ content: `You banned: **${member.user.username}**`, ephemeral: true });
			}
		}
	},
};

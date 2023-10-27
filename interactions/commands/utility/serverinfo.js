const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Display information about this server.'),
	async execute(interaction, client) {

        // Member count
        await interaction.guild.members.fetch({ withPresences: true });
        const totalCount = interaction.guild.memberCount;
        const memberCount = interaction.guild.members.cache.filter(member => !member.user.bot).size;
        const botCount = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const onlineCount = interaction.guild.members.cache.filter(member => member.presence?.status === 'online').size;

        const owner = await interaction.guild.ownerId;

		// Security
		const verificationLevel = interaction.guild.verificationLevel;
		const contentFilter = interaction.guild.explicitContentFilter;
		const defaultNotifications = interaction.guild.defaultMessageNotifications;
		const twoFactorAuth = interaction.guild.mfaLevel;

		// Channels
		await interaction.guild.channels.fetch();

		const channelInfo = [
			{ type: 'Text Channels', typeId: 0 },
			{ type: 'Announcement Channels', typeId: 5 },
			{ type: 'Voice Channels', typeId: 2 },
			{ type: 'Stage Channels', typeId: 13 },
			{ type: 'Forum Channels', typeId: 15 },
			{ type: 'Stage Channels', typeId: 13 },
			{ type: 'Media Channels', typeId: 16 },
		];

		const totalChannels = interaction.guild.channels.cache.size;

		const channelsData = [
			`- Total: \`${totalChannels}\``,
			...channelInfo
				.filter(channelType => {
					const count = interaction.guild.channels.cache.filter(channel => channel.type === channelType.typeId).size;
					return count > 0;
				})
				.map(channelType => `${channelType.type}: \`${interaction.guild.channels.cache.filter(channel => channel.type === channelType.typeId).size}\``)
		].join('\n- ');

		// Features
		const serverFeatures = interaction.guild.features.join(', ');

		// Roles
		const roles = interaction.guild.roles.cache.filter(role => role.name !== '@everyone');
		const rolesInfo = roles.map(role => `<@&${role.id}>`).join(', ');

		// Emojis
		const emojis = interaction.guild.emojis.cache;
		const totalEmojis = emojis.size;

		const emojisArray = emojis.map(emoji => emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`);
		let emojisInfo = '';
		let emojisInfo2 = '';

		for (let i = 0; i < emojisArray.length; i++) {
			if (emojisInfo.length + emojisArray[i].length > 1024) {
				emojisInfo2 += emojisArray[i] + ' ';
			} else {
				emojisInfo += emojisArray[i] + ' ';
			}
		}

		let embed = {
			title: interaction.guild.name,
			description: interaction.guild.description,
			fields: [
				{ name: 'Server Owner', value: `<@${owner}>`, inline: true },
				{ name: 'Members', value: [`- Total: \`${totalCount}\``, `- Humans: \`${memberCount}\``, `- Bots: \`${botCount}\``, `- Online: \`${onlineCount}\``].join('\n'), inline: true },
				{ name: 'Created', value: interaction.guild.createdAt.toLocaleString(), inline: true },
				{ name: 'Security', value: `- Verification Level: \`${verificationLevel}\`\n- Content Filter: \`${contentFilter}\`\n- Default Notifications: \`${defaultNotifications}\`\n- Two-Factor Auth: \`${twoFactorAuth}\``, inline: true },
				{ name: 'Channels', value: channelsData, inline: true },
				{ name: 'Server Features', value: serverFeatures },
				{ name: `Roles [${roles.size}]`, value: `${rolesInfo}` },
				{ name: `Emojis [${totalEmojis}]`, value: emojisInfo, inline: !!emojisInfo2 },
			],
			footer: {
				text: `${client.user.username}`,
				icon_url: `${client.user.displayAvatarURL()}`
			}
		};

		if (emojisInfo2) {
			embed.fields.push({ name: 'Emojis (Continued)', value: emojisInfo2, inline: true });
		}

		return await interaction.reply({ embeds: [embed] });
	},
};

const { SlashCommandBuilder } = require('discord.js');
const { getModmailBans, modmailBanAdd } = require('../../../functions/db/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modmail')
        .setDescription('Ban a member from using modmail.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban-add')
                .setDescription('Ban a member from using modmail.')
                .addUserOption(option => option.setName('target').setDescription('The member to ban.').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('The reason for banning the member.')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban-remove')
                .setDescription('Unban a member from using modmail.')
                .addStringOption(option => option.setName('target').setDescription('The member to unban.').setRequired(true).setAutocomplete(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban-list')
                .setDescription('List members banned from using modmail.')),
    async autocomplete(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'ban-remove') {
            const focusedValue = interaction.options.getFocused();
            const guild = interaction.guild.id;

            const modmailBans = await getModmailBans(guild);

            const filtered = modmailBans.filter(ban => ban.user.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice.user, value: choice.user })),
            );
        }
    },
    async execute(interaction) {
        if (!interaction.member.permissions.has('BanMembers')) {
            return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
        }

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'ban-list') {
            const guild = interaction.guild.id;
            const modmailBans = await getModmailBans(guild);

            if (modmailBans.length === 0) {
                return interaction.reply({ content: "There aren't any banned members.", ephemeral: true });
            }

            const embed = {
                title: `Modmail Banned Members`,
                fields: [],
            };

            for (const ban of modmailBans) {
                const user = await interaction.guild.members.fetch(ban.user);
                if (user.user.username) {
                    embed.fields.push({
                        name: user.user.username,
                        value: `Reason: ${ban.reason}`,
                        inline: true,
                    })
                }
            };

            return await interaction.reply({ embeds: [embed] });
        } else if (subcommand === 'ban-remove') {
            const user = interaction.options.getString('target');
            const modmailBans = await getModmailBans(interaction.guild.id);
            const ban = modmailBans.find(ban => ban.user === user);
            const guild = interaction.guild.id;

            if (!ban) {
                return interaction.reply({ content: "That user isn't banned from modmail.", ephemeral: true });
            }

            modmailBanRemove(guild);
            return interaction.reply({ content: `You modmail unbanned: **${user}**`, ephemeral: true });
        } else if (subcommand === 'ban-add') {
            const member = interaction.options.getMember('target');
            const user = member.user.id;
            const guild = interaction.guild.id;
            const reason = interaction.options.getString('reason') || 'No reason provided.';

            console.log(user, guild, reason)

            modmailBanAdd(user, guild, reason)
            return interaction.reply({ content: `You modmail banned: **${member.user.username}**`, ephemeral: true });
        }
    },
};

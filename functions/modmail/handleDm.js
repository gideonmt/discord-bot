const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const modmailChannel = require('./modmailChannel');

module.exports = async (message, client) => {
    const user = message.author;
    const guilds = client.guilds.cache.filter(guild => guild.members.cache.has(user.id));
    if (guilds.size === 0) {
        return;
    } else if (guilds.size > 1) {
        const embed = {
            title: 'Select Server',
            description: 'You are in multiple servers with me. Please select the server you want to contact the moderators of.',
            color: 0x00ff00,
        };

        const buttons = guilds.map(guild => {
            return new ButtonBuilder()
                .setCustomId(`modmail-${guild.id}`)
                .setLabel(`${guild.name}`)
                .setStyle(ButtonStyle.Secondary);
        });

        const row = new ActionRowBuilder();
        buttons.forEach(button => {
            row.addComponents(button);
        });

        message.reply({ embeds: [embed], components: [row] });
    } else if (guilds.size === 1) {
        const guild = guilds.first();

        await modmailChannel(guild, message, client);

        const messageSent = {
            author: {
                name: `${interaction.user.tag}`,
                icon_url: `${interaction.user.displayAvatarURL()}`
            },
            color: 0x00ff00,
            description: message.content,
            footer: {
                text: `${guild.name} | ${guildId}`,
                icon_url: `${guild.iconURL()}`
            }
        }

        if (message.attachments.size > 0) {
            messageSent.image = {
                url: message.attachments.first().url
            }
            messageSent.fields = [
                {
                    name: 'Attachments',
                    value: `${message.attachments.map(attachment => `[${attachment.name}](${attachment.url})`).join('\n')}`
                }
            ]
        }
    
        await interaction.reply({ content: 'Modmail Sent!', embeds: [messageSent] })
        return;
    } else {
        return;
    }
}
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = async (message, client) => {
    message.channel.sendTyping();
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

        const modmailChannel = guild.channels.cache.find(channel => { channel.name === 'modmail' });
        return;
    } else {
        return;
    }
}
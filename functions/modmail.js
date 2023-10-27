const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
// const MessageCreate = require('../events/messageCreate');
// const modmail = require('./modmail');
const modmailChannel = require('./modmailChannel');

module.exports = {
    handleDM: async (message, client) => {
        const user = message.author;
        const guilds = client.guilds.cache.filter(guild => guild.members.cache.has(user.id));
        if (guilds.size === 0) {
            return;
        } else if (guilds.size > 1) {
            const embed = {
                title: 'Select Server',
                description: 'You are in multiple servers with me. Please select the server you want to contact the moderators of.',
                color: 0x00ff00
                
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

            message.channel.send({ embeds: [embed], components: [row] });
        } else if (guilds.size === 1) {
            console.log('one guild');
            const guild = guilds.first();

            const modmailChannel = guild.channels.cache.find(channel => { channel.name === 'modmail' });
            return;
        } else {
            return;
        }
    },
    // modmailChannel: async (guild) => {
    //     console.log('modmailChannel');
    //     const modmailChannel = guild.channels.cache.find(channel => { channel.name === 'modmail' && channel.type === 15 });
    //     if (!modmailChannel) {
    //         guild.channels.create('modmail', {
    //             type: 15,
    //             reason: 'Modmail channel creation.'
    //         }).then(modmailChannel => {
    //             notifyMods(modmailChannel, message);
    //         });
    //         return;
    //     }
    //     return this.notifyMods(modmailChannel, message);
    // },
    notifyMods: async (modmailChannel, message) => {
        const embed = {
            title: 'New Modmail',
            description: `${message.content}`,
            footer: {
                text: `From ${message.author.tag} (${message.author.id})`
            }
        };

        if (message.attachments.size > 0) {
            embed.image = {
                url: message.attachments.first().url
            }
        }

        modmailChannel.send({ embeds: [embed] });
    },
    guildButton: async (interaction, client) => {
        const guildId = interaction.customId.split('-')[1];
        const guild = client.guilds.cache.get(guildId)
        modmailChannel(guild);
    },
};

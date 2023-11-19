const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const settings = require('../../settings.json');
const pingFor = settings.pingFor;
const pingId = settings.pingId;

module.exports = async (modmailChannel, message, client) => {
    const threads = modmailChannel.threads.cache.filter(thread => thread.name === message.author.tag);
    const thread = threads.first();
    let content = 'New Modmail'

    const embed = {
        author: {
            name: `${message.author.tag}`,
            icon_url: `${message.author.displayAvatarURL()}`
        },
        color: 0x00ff00,
        description: `${message.content || 'No content.'}`,
        footer: {
            text: `User ID: ${message.author.id}`
        }
    };

    if (message.attachments.size > 0) {
        embed.image = {
            url: message.attachments.first().url
        }
        embed.fields = [
            {
                name: 'Attachments',
                value: `${message.attachments.map(attachment => `[${attachment.name}](${attachment.url})`).join('\n')}`
            }
        ]
    }

    if (pingFor === 'all') {
        content = `<@&${pingId}> ${content}`;
    } else if (pingFor === 'new' && (!thread || thread.archived === true)) {
        content = `<@&${pingId}> ${content}`;
    } else if (pingFor === 'none') {
        content = content;
    } else if (pingFor === 'timed' && (!thread || thread.archived === true)) {
        content = `<@&${pingId}> ${content}`;
    } else if (pingFor === 'timed' && (thread && thread.archived === false)) {
        const messages = await (thread ? thread.messages.fetch({ limit: 100 }) : []);
        const lastMessage = messages.first();
        if (lastMessage) {
            const lastMessageTime = lastMessage.createdAt.getTime();
            const currentTime = Date.now();
            const timeDifference = currentTime - lastMessageTime;
            const timeDifferenceMinutes = timeDifference / 60000;
            if (timeDifferenceMinutes < 5 && lastMessage.author === client.user) {
                content = `<@&${pingId}> ${content}`;
            }
        }
    } else {
        content = content;
    }    

    // button
    const replyButton = new ButtonBuilder()
        .setCustomId(`reply-${message.author.id}`)
        .setLabel(`Reply to ${message.author.tag}`)
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder();
    row.addComponents(replyButton);

    if (thread && thread.archived === false) {
        thread.send({
            content: content,
            embeds: [embed],
            components: [row]
        });
    } else {
        modmailChannel.threads
            .create({
                name: message.author.tag,
                message: {
                    content: content,
                    embeds: [embed],
                    components: [row]
                }
            });
    }
}
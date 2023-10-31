module.exports = async (modmailChannel, message) => {
    const threads = modmailChannel.threads.cache.filter(thread => thread.name === message.author.tag);
    const thread = threads.first();

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
    }

    if (thread) {
        thread.send({
            content: 'New Modmail',
            embeds: [embed],
        });
    } else {
        modmailChannel.threads
            .create({
                name: message.author.tag,
                message: {
                    content: 'New Modmail',
                    embeds: [embed],
                }
            });
    }
}
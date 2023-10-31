module.exports = async (modmailChannel, message, guild) => {
    const embed = {
        author: {
            name: `${message.author.tag}`,
            icon_url: `${message.author.displayAvatarURL()}`
        },
        title: 'New Modmail',
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

    modmailChannel.threads
    .create({
      name: message.author.tag,
      message: {
       content: 'New Modmail',
       embeds: [embed],
      }
    });
}
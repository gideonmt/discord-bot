module.exports = async (modmailChannel, message) => {
    console.log(message);
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
}
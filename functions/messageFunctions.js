const settings = require('../settings.json');
const messageFunctions = settings.messageFunctions;
const messageFunctionsEnabled = settings.messageFunctionsEnabled;

function replace(messageFunctions, message, client) {
    const replacements = {
        '{client.mention}': `<@${client.user.id}>`,
        '{client.username}': `${client.user.username}`,
        '{client.id}': `${client.user.id}`,
        '{client.tag}': `${client.user.tag}`,
        '{user.mention}': `<@${message.author.id}>`,
        '{user.username}': `${message.author.username}`,
        '{user.id}': `${message.author.id}`,
        '{user.tag}': `${message.author.tag}`,
        '{channel.mention}': `<#${message.channel.id}>`,
        '{channel.name}': `${message.channel.name}`,
        '{channel.id}': `${message.channel.id}`,
        '{channel.topic}': `${message.channel.topic}`,
        '{guild.name}': `${message.guild.name}`,
        '{guild.id}': `${message.guild.id}`,
        '{guild.memberCount}': `${message.guild.memberCount}`,
        '{message.content}': `${message.content}`,
        '{message.id}': `${message.id}`,
    }

    for (const placeholder in replacements) {
        messageFunctions.trigger = messageFunctions.trigger.replace(placeholder, replacements[placeholder]);
    }
}

module.exports = async (message, client) => {
    if (message.author.bot || message.channel.type === 1 || !messageFunctionsEnabled || !messageFunctions) return;
    messageFunctions.forEach(async (messageFunction) => {
        replace(messageFunction, message, client);
    });

    messageFunctions.forEach(async (messageFunction) => {
        if (message.content.toLowerCase().includes(messageFunction.trigger)) {
            if (messageFunction.actions) {
                messageFunction.actions.forEach(async (action) => {
                    if (action) {
                        if (action.reply) {
                            await message.reply(action.reply);
                        } else if (action.react) {
                            await message.react(action.react);
                        } else if (action.delete) {
                            await message.delete();
                        } else if (action.pin) {
                            await message.pin();
                        }
                    }
                });
            }
        }
    });
}

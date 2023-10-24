function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    handleNewMember: function (guildMember, client) {
        //give community role
        let welcomeRole = guildMember.guild.roles.cache.get("740989114064699432");
        guildMember.roles.add(welcomeRole);

        //welcome message
        let newMemberId = guildMember.user.id
        const channel = client.channels.cache.get('');

        let rndInt = randomIntFromInterval(1, 12)

        console.log(rndInt)

        switch (rndInt) {
            case 1:
                channel.send(`Welcome to OES <@${newMemberId}>! We're happy you found us.`)
                break;
            case 2:
                channel.send(`Whats up <@${newMemberId}>?`)
                break;
            case 3:
                channel.send(`<@${newMemberId}> joined the server!`)
                break;
            case 4:
                channel.send(`Good to see you, <@${newMemberId}>!`)
                break;
            case 5:
                channel.send(`Welcome <@${newMemberId}>. Say hello!`)
                break;
            case 6:
                channel.send(`Welcome to OES <@${newMemberId}>. We're glad you made it!`)
                break;
            case 7:
                channel.send(`<@${newMemberId}> is here!`)
                break;
            case 8:
                channel.send(`<@${newMemberId}> has joined! Have a good time.`)
                break;
            case 9:
                channel.send(`Hey there <@${newMemberId}>! Thanks for joining OES. We hope you enjoy your stay!`)
                break;
            case 10:
                channel.send(`Welcome to OES, <@${newMemberId}>! We're excited to have you.`)
                break;
            case 11:
                channel.send(`Hey <@${newMemberId}>, welcome to OES!`)
                break;
            case 12:
                channel.send(`Welcome to OES, <@${newMemberId}>! We hope enjoy.`)
                break;
        }
    }
};

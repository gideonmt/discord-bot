function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    handleNewMember: function (guildMember, client) {
        let welcomeRole = guildMember.guild.roles.cache.get("740989114064699432");
        guildMember.roles.add(welcomeRole);

        let newMemberId = guildMember.user.id
        const channel = client.channels.cache.get('');

        let rndInt = randomIntFromInterval(1, 12)
    }
};

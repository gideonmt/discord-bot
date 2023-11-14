async function addWarn(user, guild, reason) {
    const Warns = require('./db/dbObjects').Warns;
    await Warns.sync();

    const warn = await Warns.create({
        user: user,
        guild: guild,
        reason: reason,
    });

    return warn;
}

async function removeWarn(user, guild, id) {
    const Warns = require('./db/dbObjects').Warns;

    const warn = await Warns.findOne({ where: { user: user, guild: guild, id: id } });

    if (!warn) return;

    await warn.destroy();
}

async function listWarns(guild, user) {
    const Warns = require('./db/dbObjects').Warns;

    if (user !== undefined) {
        const warns = await Warns.findAll({ where: { guild: guild, user: user } });

        return warns;
    } else {
        const warns = await Warns.findAll({ where: { guild: guild } });

        return warns;
    }
}

module.exports = { addWarn, removeWarn, listWarns };
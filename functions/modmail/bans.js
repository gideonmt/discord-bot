async function modmailBanAdd(user, guild, reason) {
	const ModmailBans = require('../db/dbObjects').ModmailBans;
	await ModmailBans.sync();

	const modmailBan = await ModmailBans.create({
		user: user,
		guild: guild,
		reason: reason,
	});

	return modmailBan;
}

async function modmailBanRemove(user, guild) {
	const ModmailBans = require('../db/dbObjects').ModmailBans;

	const modmailBan = await ModmailBans.findOne({ where: { user: user.id, guild: guild.id } });

	if (!modmailBan) return;

	await modmailBan.destroy();
}

async function getModmailBans(guild) {
	const ModmailBans = require('../db/dbObjects').ModmailBans;
	const modmailBan = await ModmailBans.findAll({ where: { guild: guild } });
	return modmailBan;
}

module.exports = { modmailBanAdd, modmailBanRemove, getModmailBans }
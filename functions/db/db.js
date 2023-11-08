async function addReminder(user, time, message) {
	const Reminders = require('./dbObjects').Reminders;
	await Reminders.sync();
	
	const reminder = await Reminders.create({
        user: user.id,
        time: time,
        message: message,
    });

	return reminder;
}

async function checkReminders(client) {
	const Reminders = require('./dbObjects').Reminders;

	const reminders = await Reminders.findAll();

	for (const reminder of reminders) {
		if (reminder.time <= Date.now()) {
			const user = await client.users.fetch(reminder.user);
			user.send(`Reminder: ${reminder.message}`);
			await reminder.destroy();
		}
	}
}

async function getReminders(user) {
	const Reminders = require('./dbObjects').Reminders;

	const reminders = await Reminders.findAll({ where: { user: user } });

	return reminders;
}

async function removeReminder(user, message) {
	const Reminders = require('./dbObjects').Reminders;

	const reminder = await Reminders.findOne({ where: { user: user, message: message } });

	if (!reminder) return;

	await reminder.destroy();
}

async function modmailBanAdd(user, guild, reason) {
	const ModmailBans = require('./dbObjects').ModmailBans;
	await ModmailBans.sync();
	
	const modmailBan = await ModmailBans.create({
		user: user,
		guild: guild,
		reason: reason,
	});

	return modmailBan;
}

async function modmailBanRemove(user, guild) {
	const ModmailBans = require('./dbObjects').ModmailBans;

	const modmailBan = await ModmailBans.findOne({ where: { user: user.id, guild: guild.id } });

	if (!modmailBan) return;

	await modmailBan.destroy();
}

async function getModmailBans(guild) {
	const ModmailBans = require('./dbObjects').ModmailBans;
	const modmailBan = await ModmailBans.findAll({ where: { guild: guild } });
	return modmailBan;
}

module.exports = { addReminder, removeReminder, checkReminders, getReminders, modmailBanAdd, modmailBanRemove, getModmailBans };
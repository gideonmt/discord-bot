async function addReminder(user, time, message) {
	const Reminders = require('./db/dbObjects').Reminders;
	await Reminders.sync();

	const reminder = await Reminders.create({
		user: user.id,
		time: time,
		message: message,
	});

	return reminder;
}

async function checkReminders(client) {
	const Reminders = require('./db/dbObjects').Reminders;

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
	const Reminders = require('./db/dbObjects').Reminders;

	const reminders = await Reminders.findAll({ where: { user: user } });

	return reminders;
}

async function removeReminder(user, message) {
	const Reminders = require('./db/dbObjects').Reminders;

	const reminder = await Reminders.findOne({ where: { user: user, message: message } });

	if (!reminder) return;

	await reminder.destroy();
}

module.exports = { addReminder, checkReminders, getReminders, removeReminder }
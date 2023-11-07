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
		const time = parseInt(reminder.time);
		if (time <= Date.now()) {
			const user = await client.users.fetch(reminder.user);
			user.send(`Reminder: ${reminder.message}`);
			await reminder.destroy();
		}
	}
}

module.exports = { addReminder, checkReminders };
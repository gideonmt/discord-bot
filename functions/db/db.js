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

async function pollAdd(message, options, endTime, type) {
	const Polls = require('./dbObjects').Polls;
	await Polls.sync();

	const optionsArray = [];
	for (const option of options) {
		optionsArray.push({
			option: option,
			votes: [],
		});
	}

	const poll = await Polls.create({
		message: message,
		endTime: endTime,
		options: optionsArray,
		type: type,
	});

	return poll;
}

async function pollRemove(message) {
	const Polls = require('./dbObjects').Polls;
	await Polls.sync();

	const poll = await Polls.findOne({ where: { message: message } });

	if (!poll) return;
	poll.destroy();
}

async function getPolls() {
	const Polls = require('./dbObjects').Polls;
	await Polls.sync();

	const polls = await Polls.findAll();

	return polls;
}

async function pollVote(message, user, option) {
	const Polls = require('./dbObjects').Polls;
	await Polls.sync();

	const poll = await Polls.findOne({ where: { message: message } });

	if (!poll) return;

	const optionObject = poll.options.find(opt => opt.option === option);

	if (optionObject) {
		if (optionObject.votes.some(vote => vote === user)) {
			optionObject.votes = optionObject.votes.filter(vote => vote !== user);
		} else {
			optionObject.votes.push(user);
		}
		await Polls.update(
			{ options: poll.options },
			{ where: { message: message } }
		);
	}

	return pollVote;
}

async function checkPolls(client) {
	const Polls = require('./dbObjects').Polls;
	await Polls.sync();

	const polls = await Polls.findAll();

	for (const poll in polls) {
		if (poll.endTime <= Date.now()) {
			const message = poll.message;
			await pollRemove(message);
		}
	}
}

module.exports = {
	addReminder, removeReminder, checkReminders, getReminders,
	modmailBanAdd, modmailBanRemove, getModmailBans,
	pollAdd, pollRemove, getPolls, pollVote, checkPolls,
};
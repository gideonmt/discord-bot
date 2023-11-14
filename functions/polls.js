async function pollAdd(message, options, endTime, type, user) {
	const Polls = require('./db/dbObjects').Polls;
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
		creator: user,
	});

	return poll;
}

async function pollRemove(message, client) {
	const Polls = require('./db/dbObjects').Polls;
	await Polls.sync();

	const poll = await Polls.findOne({ where: { message: message } });

	if (!poll) return;
	const user = await client.users.fetch(poll.creator);
	const embed = {
		title: `Poll Results`,
		description: poll.options.map(opt => `${opt.option}: ${opt.votes.length}`).join('\n'),
	};

	user.send({ content: `Your poll has ended.`, embeds: [embed] });
	poll.destroy();
}

async function getPolls() {
	const Polls = require('./db/dbObjects').Polls;
	await Polls.sync();

	const polls = await Polls.findAll();

	return polls;
}

async function pollVote(messageObject, user, option, multiple) {
	const Polls = require('./db/dbObjects').Polls;
	await Polls.sync();

	const message = messageObject.id;

	const poll = await Polls.findOne({ where: { message: message } });

	if (!poll) return;

	if (multiple === false) {
		option = option[0]
	} else if (multiple === true) {
		option = option
	}

	const optionObject = poll.options.find(opt => opt.option === option);

	let totalVotes = poll.options.reduce((total, option) => total.concat(option.votes), []);

	if (optionObject) {
		if (totalVotes.includes(user)) {
			if (optionObject.votes.some(vote => vote === user)) {
				optionObject.votes = optionObject.votes.filter(vote => vote !== user);
			} else {
				for (const opt of poll.options) {
					opt.votes = opt.votes.filter(vote => vote !== user);
				}
				optionObject.votes.push(user);
			}
		} else {
			optionObject.votes.push(user);
		}
		await Polls.update(
			{ options: poll.options },
			{ where: { message: message } }
		);
	}

	totalVotes = poll.options.reduce((total, option) => total.concat(option.votes), []);

	const description = `${poll.options.map(opt => `${opt.option.charAt(0).toUpperCase() + opt.option.slice(1)}: ${opt.votes.length} votes (${Math.round(opt.votes.length / totalVotes.length * 100) || 0}%)`).join('\n')}\nTotal Votes: ${totalVotes.length}\n\nEnds <t:${Math.floor(poll.endTime / 1000)}:R>`;

	const embed = {
		author: {
			name: messageObject.embeds[0].author.name,
			icon_url: messageObject.embeds[0].author.iconURL,
		},
		title: messageObject.embeds[0].title,
		description: description,
		fields: messageObject.embeds[0].fields,
	};

	const components = messageObject.components;

	messageObject.edit({ content: messageObject.content, embeds: [embed], components: components });

	return pollVote;
}

async function checkPolls(client) {
	const Polls = require('./db/dbObjects').Polls;

	const polls = await Polls.findAll();

	for (const poll of polls) {
		if (poll.endTime <= Date.now()) {
			const message = poll.message;
			await pollRemove(message, client);
		}
	}
}

module.exports = { pollAdd, pollRemove, getPolls, pollVote, checkPolls };
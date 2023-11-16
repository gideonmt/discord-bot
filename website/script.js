document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form');

    // join
    const welcomeEnabled = document.getElementById('welcome-enabled');
    const welcomeChannelInput = document.getElementById('welcome-channel');
    const welcomeMessagesTextarea = document.getElementById('welcome-messages');
    const addWelcomeMessageButton = document.getElementById('add-welcome-message');
    const welcomeMessagesList = document.getElementById('welcome-messages-list');
    const newMemberRoleEnabled = document.getElementById('new-member-role-enabled');
    const newMemberRoleId = document.getElementById('new-member-role');

    // leave
    const leaveEnabled = document.getElementById('leave-enabled');
    const leaveChannelInput = document.getElementById('leave-channel');
    const leaveMessagesTextarea = document.getElementById('leave-messages');
    const addLeaveMessageButton = document.getElementById('add-leave-message');
    const leaveMessagesList = document.getElementById('leave-messages-list');

    // trigger
    const messageFunctionsEnabled = document.getElementById('message-functions-enabled');
    const triggerMessageInput = document.getElementById('trigger-message');
    const actionDropdown = document.getElementById('action-dropdown');
    const messageActionsList = document.getElementById('message-actions-list');
    const addActionButton = document.getElementById('add-message-function');
    const messageFunctionsList = document.getElementById('message-functions-list');

    // starboard
    const starboardEnabled = document.getElementById('starboard-enabled');
    const starboardChannelInput = document.getElementById('starboard-channel');
    const starboardEmojisInput = document.getElementById('starboard-emojis');
    const starboardReactionsInput = document.getElementById('starboard-reactions');

    // modmail
    const modmailEnabled = document.getElementById('modmail-enabled');
    const pingId = document.getElementById('ping-id');
    const pingFor = document.getElementById('ping-for');

    // activity status
    const activityStatusEnabled = document.getElementById('activity-status-enabled');
    const activityStatusType = document.getElementById('activity-status-type');
    const activityStatusText = document.getElementById('activity-status');
    const addActivityStatusButton = document.getElementById('add-activity-status');
    const activityStatusList = document.getElementById('activity-status-list');

    // Welcome message settings
    addWelcomeMessageButton.addEventListener('click', () => {
        const newMessage = welcomeMessagesTextarea.value.trim();
        if (newMessage) {
            const listItem = document.createElement('li');
            listItem.textContent = newMessage;
            welcomeMessagesList.appendChild(listItem);
            welcomeMessagesTextarea.value = '';
        } else
            alert('Please enter a message.');
    });

    // Leave message settings
    addLeaveMessageButton.addEventListener('click', () => {
        const newMessage = leaveMessagesTextarea.value.trim();
        if (newMessage) {
            const listItem = document.createElement('li');
            listItem.textContent = newMessage;
            leaveMessagesList.appendChild(listItem);
            leaveMessagesTextarea.value = '';
        } else
            alert('Please enter a message.');
    });

    // Trigger message settings
    document.getElementById('reply-message-div').style.display = 'none';
    document.getElementById('react-emoji-div').style.display = 'none';

    const options = {
        "reply": "Reply to Message",
        "react": "React to Message",
        "pin": "Pin Message",
        "delete": "Delete Message",
    }

    actionDropdown.innerHTML = `<option value="">Select an action</option>`;
    for (const [key, value] of Object.entries(options)) {
        actionDropdown.innerHTML += `<option value="${key}">${value}</option>`;
    }

    actionDropdown.addEventListener('change', () => {
        const selectedAction = actionDropdown.value;
        if (selectedAction) {
            const listItem = document.createElement('li');
            listItem.textContent = selectedAction;
            if (selectedAction === 'reply') {
                listItem.classList.add('reply');
                document.getElementById('reply-message-div').style.display = 'block';
                replyTextInput.value = '';
                listItem.textContent += `: ${replyTextInput.value}`;
                replyTextInput.value = '';
            } else if (selectedAction === 'react') {
                listItem.classList.add('react');
                document.getElementById('react-emoji-div').style.display = 'block';
                reactTextInput.value = '';
                listItem.textContent += `: ${reactTextInput.value}`;
                reactTextInput.value = '';
            } else {
                listItem.textContent += ': true';
            }
            messageActionsList.appendChild(listItem);
            actionDropdown.selectedIndex = 0;
            //remove from dropdown
            const option = actionDropdown.querySelector(`option[value="${selectedAction}"]`);
            option.parentNode.removeChild(option);
        }
    });

    // reply text input
    const replyTextInput = document.getElementById('reply-text-input');
    replyTextInput.addEventListener('input', () => {
        const replyMessageListItem = messageActionsList.querySelector('li.reply');
        if (replyMessageListItem) {
            replyMessageListItem.textContent = `reply: ${replyTextInput.value}`;
        }
    });

    // react text input
    const reactTextInput = document.getElementById('react-text-input');
    reactTextInput.addEventListener('input', () => {
        const reactMessageListItem = messageActionsList.querySelector('li.react');
        if (reactMessageListItem) {
            reactMessageListItem.textContent = `react: ${reactTextInput.value}`;
        }
    });

    addActionButton.addEventListener('click', () => {
        if (triggerMessageInput.value && messageActionsList.children.length > 0) {
            const listItem = document.createElement('li');
            const messageList = document.createElement('ul');
            const triggerMessageListItem = document.createElement('li');
            const actionsListItem = document.createElement('li');
            const actionsList = document.createElement('ul');
            listItem.appendChild(messageList);
            messageList.appendChild(triggerMessageListItem);
            triggerMessageListItem.textContent = `Trigger: ${triggerMessageInput.value}`;
            messageList.appendChild(actionsListItem);
            actionsListItem.textContent = 'Actions: ';
            actionsListItem.appendChild(actionsList);
            Array.from(messageActionsList.children).forEach(action => {
                const actionListItem = document.createElement('li');
                actionListItem.textContent = action.textContent;
                actionsList.appendChild(actionListItem);
            });
            messageFunctionsList.appendChild(listItem);
            triggerMessageInput.value = '';
            messageActionsList.innerHTML = '';
            document.getElementById('reply-message-div').style.display = 'none';
            document.getElementById('react-emoji-div').style.display = 'none';
        } else
            alert('Please enter a trigger message and at least one action.');
    });


    // Activity Status
    addActivityStatusButton.addEventListener('click', () => {
        const newActivityStatus = `${activityStatusType.value}: ${activityStatusText.value}`;
        if (newActivityStatus && activityStatusType.value && activityStatusText.value) {
            const listItem = document.createElement('li');
            listItem.textContent = newActivityStatus;
            activityStatusList.appendChild(listItem);
            activityStatusText.value = '';
        } else if (activityStatusType.value) {
            alert('Please enter a message.');
        } else if (activityStatusText.value) {
            alert('Please enter a type.');
        } else {
            alert('Please enter a type and a message.');
        }
    });

    fetch('/api/settings')
        .then(response => response.json())
        .then(existingSettings => {
            console.log(existingSettings);
            // Welcome Message
            welcomeEnabled.checked = existingSettings.welcomeEnabled;
            welcomeChannelInput.value = existingSettings.welcomeChannel;

            existingSettings.welcomeMessages.forEach(message => {
                const listItem = document.createElement('li');
                listItem.textContent = message;
                welcomeMessagesList.appendChild(listItem);
            });

            // New member role
            newMemberRoleEnabled.checked = existingSettings.newMemberRoleEnabled;
            newMemberRoleId.value = existingSettings.newMemberRoleId;

            // Leave Message
            leaveEnabled.checked = existingSettings.leaveEnabled;
            leaveChannelInput.value = existingSettings.leaveChannel;

            existingSettings.leaveMessages.forEach(message => {
                const listItem = document.createElement('li');
                listItem.textContent = message;
                leaveMessagesList.appendChild(listItem);
            });

            // For message functions
            messageFunctionsEnabled.checked = existingSettings.messageFunctionsEnabled;
            existingSettings.messageFunctions.forEach(messageFunction => {
                const listItem = document.createElement('li');
                const messageList = document.createElement('ul');
                const triggerMessageListItem = document.createElement('li');
                const actionsListItem = document.createElement('li');
                const actionsList = document.createElement('ul');
                listItem.appendChild(messageList);
                messageList.appendChild(triggerMessageListItem);
                triggerMessageListItem.textContent = `Trigger: ${messageFunction.trigger}`;
                messageList.appendChild(actionsListItem);
                actionsListItem.textContent = 'Actions: ';
                actionsListItem.appendChild(actionsList);
                messageFunction.actions.forEach(action => {
                    const actionListItem = document.createElement('li');
                    actionListItem.textContent = Object.entries(action).map(([key, value]) => `${key}: ${value}`).join(', ');
                    actionsList.appendChild(actionListItem);
                });
                messageFunctionsList.appendChild(listItem);
            });

            // Starboard
            starboardEnabled.checked = existingSettings.starboardEnabled;
            starboardChannelInput.value = existingSettings.starboardChannel;
            starboardEmojisInput.value = existingSettings.starboardEmojis;
            starboardReactionsInput.value = existingSettings.starboardReactions;

            // Modmail
            modmailEnabled.checked = existingSettings.modmailEnabled;
            pingId.value = existingSettings.pingId;
            pingFor.value = existingSettings.pingFor;

            // Activity Status
            activityStatusEnabled.checked = existingSettings.activityStatusEnabled;
            existingSettings.activityStatus.forEach(status => {
                const listItem = document.createElement('li');
                listItem.textContent = status;
                activityStatusList.appendChild(listItem);
            });
        });

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const welcomeMessages = Array.from(welcomeMessagesList.children).map(li => li.textContent);
        const leaveMessages = Array.from(leaveMessagesList.children).map(li => li.textContent);
        const activityStatus = Array.from(activityStatusList.children).map(li => li.textContent);

        const messageFunctions = Array.from(messageFunctionsList.children).map(li => {
            const trigger = li.querySelector('ul > li:first-child').textContent.replace('Trigger: ', '');
            const actions = Array.from(li.querySelectorAll('ul > li:last-child > ul > li')).map(action => {
                const actionText = action.textContent;
                const actionType = actionText.split(':')[0];
                if (actionType === 'Trigger' || actionType === 'Actions') {
                    return null;
                }
                const actionValue = actionText.split(':')[1].trim();
                const actionObject = {};
                actionObject[actionType] = actionValue;
                return actionObject;
            }).filter(action => action !== null);
            return { trigger, actions };
        });

        const updatedSettings = {
            welcomeEnabled: welcomeEnabled.checked,
            welcomeChannel: welcomeChannelInput.value,
            welcomeMessages: welcomeMessages,
            newMemberRoleEnabled: newMemberRoleEnabled.checked,
            newMemberRoleId: newMemberRoleId.value,
            leaveEnabled: leaveEnabled.checked,
            leaveChannel: leaveChannelInput.value,
            leaveMessages: leaveMessages,
            messageFunctionsEnabled: messageFunctionsEnabled.checked,
            messageFunctions: messageFunctions,
            starboardEnabled: starboardEnabled.checked,
            starboardChannel: starboardChannelInput.value,
            starboardEmojis: starboardEmojisInput.value,
            starboardReactions: parseInt(starboardReactionsInput.value),
            modmailEnabled: modmailEnabled.checked,
            pingId: pingId.value,
            pingFor: pingFor.value,
            activityStatusEnabled: activityStatusEnabled.checked,
            activityStatus: activityStatus,
        };

        fetch('/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSettings),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(updatedSettings)
            });
    });
});

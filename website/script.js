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
    const autoResponseTextarea = document.getElementById('auto-response');
    const autoReactionInput = document.getElementById('auto-reaction');

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

    actionDropdown.addEventListener('change', () => {
        const selectedAction = actionDropdown.value;
        if (selectedAction) {
            const listItem = document.createElement('li');
            listItem.textContent = selectedAction;
            if (selectedAction === 'reply') {
                document.getElementById('reply-message-div').style.display = 'block';
                replyTextInput.value = '';
                listItem.textContent += `: ${replyTextInput.value}`;
                replyTextInput.value = '';
            } else if (selectedAction === 'react') {
                document.getElementById('react-emoji-div').style.display = 'block';
                reactTextInput.value = '';
                listItem.textContent += `: ${reactTextInput.value}`;
                reactTextInput.value = '';
            } else {
                listItem.textContent += ': true';
            }
            messageActionsList.appendChild(listItem);
            actionDropdown.selectedIndex = 0;
        }
    });

    // reply text input
    const replyTextInput = document.getElementById('reply-text-input');
    replyTextInput.addEventListener('input', () => {
        const replyMessageListItem = messageActionsList.querySelector('li:first-child');
        if (replyMessageListItem) {
            replyMessageListItem.textContent = `reply: ${replyTextInput.value}`;
        }
    });

    // react text input
    const reactTextInput = document.getElementById('react-text-input');
    reactTextInput.addEventListener('input', () => {
        const reactMessageListItem = messageActionsList.querySelector('li:first-child');
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

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get the updated settings, including the lists of welcome and leave messages
        const welcomeMessages = Array.from(welcomeMessagesList.children).map(li => li.textContent);
        const leaveMessages = Array.from(leaveMessagesList.children).map(li => li.textContent);
        //struction messageFunctions like this:
        // messageFunctions: [
        //   {
        //     trigger: 'hello',
        //     actions: [reply: 'hi', react: '😄']
        //   },
        //   {
        //     trigger: 'pin me',
        //     actions: [reply: 'Ok!', react: '📌', pin: true]
        //   }
        // ]

        const messageFunctions = Array.from(messageFunctionsList.children).map(li => {
            const trigger = li.querySelector('ul > li:first-child').textContent.replace('Trigger: ', '');
            const actions = Array.from(li.querySelectorAll('ul > li:last-child > ul > li')).map(action => {
                const actionText = action.textContent;
                const actionType = actionText.split(':')[0];
                const actionValue = actionText.split(':')[1].trim();
                const actionObject = {};
                actionObject[actionType] = actionValue;
                return actionObject;
            });
            console.log({ trigger, actions });
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
            triggerMessage: triggerMessageInput.value,
            messageFunctions: messageFunctions,
            starboardChannel: starboardChannelInput.value,
            starboardEmojis: starboardEmojisInput.value,
            starboardReactions: parseInt(starboardReactionsInput.value),
            modmailEnabled: modmailEnabled.checked,
            autoResponse: autoResponseTextarea.value,
            autoReaction: autoReactionInput.value,
        };

        console.log(updatedSettings);

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
            });
    });
});

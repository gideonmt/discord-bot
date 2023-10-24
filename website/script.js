document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form');

    // join
    const welcomeEnabledCheckbox = document.getElementById('welcome-enabled');
    const welcomeChannelInput = document.getElementById('welcome-channel');
    const welcomeMessagesTextarea = document.getElementById('welcome-messages');
    const addWelcomeMessageButton = document.getElementById('add-welcome-message');
    const welcomeMessagesList = document.getElementById('welcome-messages-list');
    const newMemberRoleEnabled = document.getElementById('new-member-role-enabled');    
    const newMemberRoleId = document.getElementById('new-member-role');

    // leave
    const leaveEnabledCheckbox = document.getElementById('leave-enabled');
    const leaveChannelInput = document.getElementById('leave-channel');
    const leaveMessagesTextarea = document.getElementById('leave-messages');
    const addLeaveMessageButton = document.getElementById('add-leave-message');
    const leaveMessagesList = document.getElementById('leave-messages-list');

    // trigger
    const triggerMessageInput = document.getElementById('trigger-message');
    const actionDropdown = document.getElementById('action-dropdown');
    const addActionButton = document.getElementById('add-action');
    const messageFunctionsList = document.getElementById('message-functions-list');

    // starboard
    const starboardEnabledCheckbox = document.getElementById('starboard-enabled');
    const starboardChannelInput = document.getElementById('starboard-channel');
    const starboardEmojisInput = document.getElementById('starboard-emojis');
    const starboardReactionsInput = document.getElementById('starboard-reactions');

    // modmail
    const modmailEnabledCheckbox = document.getElementById('modmail-enabled');
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
        }
    });

    // Leave message settings
    addLeaveMessageButton.addEventListener('click', () => {
        const newMessage = leaveMessagesTextarea.value.trim();
        if (newMessage) {
            const listItem = document.createElement('li');
            listItem.textContent = newMessage;
            leaveMessagesList.appendChild(listItem);
            leaveMessagesTextarea.value = '';
        }
    });

    // Trigger message settings
    actionDropdown.addEventListener('change', () => {
        const selectedAction = actionDropdown.value;
        if (selectedAction === 'reply') {
            document.getElementById('reply-text-input').style.display = 'block';
        } else {
            document.getElementById('reply-text-input').style.display = 'none';
        }
    });

    addActionButton.addEventListener('click', () => {
        const selectedAction = actionDropdown.value;
        if (selectedAction) {
            const listItem = document.createElement('li');
            listItem.textContent = selectedAction;
            if (selectedAction === 'reply') {
                const replyTextInput = document.getElementById('reply-text');
                listItem.textContent += `: ${replyTextInput.value}`;
                replyTextInput.value = '';
            }
            messageFunctionsList.appendChild(listItem);
            actionDropdown.selectedIndex = 0;
        }
    });

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get the updated settings, including the lists of welcome and leave messages
        const welcomeMessages = Array.from(welcomeMessagesList.children).map(li => li.textContent);
        const leaveMessages = Array.from(leaveMessagesList.children).map(li => li.textContent);
        // const actions = Array.from(messageFunctionsList.children).map(li => li.textContent);
        const updatedSettings = {
            welcomeEnabled: welcomeEnabledCheckbox.checked,
            welcomeChannel: welcomeChannelInput.value,
            welcomeMessages: welcomeMessages,
            newMemberRoleEnabled: newMemberRoleEnabled.checked,
            newMemberRoleId: newMemberRoleId.value,
            leaveEnabled: leaveEnabledCheckbox.checked,
            leaveChannel: leaveChannelInput.value,
            leaveMessages: leaveMessages,
            // triggerMessage: triggerMessageInput.value,
            // actions: actions,
            // starboardChannel: starboardChannelInput.value,
            // starboardEmojis: starboardEmojisInput.value,
            // starboardReactions: parseInt(starboardReactionsInput.value),
            // modmailEnabled: modmailEnabledCheckbox.checked,
            // autoResponse: autoResponseTextarea.value,
            // autoReaction: autoReactionInput.value,
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

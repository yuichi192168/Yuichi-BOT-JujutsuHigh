module.exports.config = {
    name: "message",
    version: "1.0.2",
    hasPermssion: 2,
    credits: "Max Spencer",
    description: "List groups and send a message to a chosen group.",
    usePrefix: true,
    commandCategory: "admin",
    usages: "[list|send] [Text]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const action = args[0];
    const threadID = event.threadID;
    
    // Function to list groups
    const listGroups = async () => {
        try {
            const threadList = await api.getThreadList(100, null, ['INBOX']);
            const groupThreads = threadList.filter(thread => thread.isGroup);
            let message = "List of Groups:\n";
            groupThreads.forEach((group, index) => {
                message += `${index + 1}. ${group.name} (ID: ${group.threadID})\n`;
            });
            message += "Reply with the group number to choose.";
            api.sendMessage(message, threadID);
            
            // Wait for user response to choose a group
            api.listenMqtt(async (err, message) => {
                if (message.senderID === threadID && !isNaN(message.body)) {
                    const chosenIndex = parseInt(message.body) - 1;
                    if (chosenIndex >= 0 && chosenIndex < groupThreads.length) {
                        const chosenGroup = groupThreads[chosenIndex];
                        api.sendMessage(`You chose: ${chosenGroup.name}. Now send your message.`, threadID);
                        
                        // Wait for message to send to the chosen group
                        api.listenMqtt(async (err, message) => {
                            if (message.senderID === threadID) {
                                const customMessage = message.body;
                                await api.sendMessage(customMessage, chosenGroup.threadID);
                                api.sendMessage(`Message sent to ${chosenGroup.name}.`, threadID);
                            }
                        });
                    } else {
                        api.sendMessage("Invalid choice. Please try again.", threadID);
                    }
                }
            });
        } catch (error) {
            console.error("Error listing groups:", error);
            api.sendMessage("Failed to list groups.", threadID);
        }
    };
    
    // Function to send message directly (if threadID is given)
    const sendMessageToGroup = async () => {
        const groupID = args[1];
        const customMessage = args.slice(2).join(' ');
        if (!groupID || !customMessage) {
            api.sendMessage("Please provide a group ID and a message.", threadID);
            return;
        }
        try {
            await api.sendMessage(customMessage, groupID);
            api.sendMessage(`Message sent to group ID ${groupID} successfully.`, threadID);
        } catch (error) {
            console.error("Error sending a message:", error);
            api.sendMessage("Failed to send the message. Please check the group ID.", threadID);
        }
    };

    // Determine the action
    if (action === "list") {
        await listGroups();
    } else if (action === "send") {
        await sendMessageToGroup();
    } else {
        api.sendMessage("Invalid action. Use 'list' to see groups or 'send' followed by group ID and message.", threadID);
    }
};

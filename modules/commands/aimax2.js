const axios = require('axios');

// Store processed message IDs
const processedMessageIDs = new Set();

async function handleCommand(api, event, args) {
    const messageID = event.messageID;

    // Check if the message ID is already processed
    if (processedMessageIDs.has(messageID)) {
        console.log("Message already processed:", messageID);
        return;
    }

    try {
        const question = args.join(" ").trim();

        if (!question) {
            api.sendMessage("ano kailangan mo? may itatanong ka ba? i-reply mo lang dito sa message ko", event.threadID, messageID);
            processedMessageIDs.add(messageID);
            return;
        }

        const response = await getAIResponse(question);
        api.sendMessage(response, event.threadID, messageID);

        // Add the message ID to the set of processed messages
        processedMessageIDs.add(messageID);
    } catch (error) {
        console.error("Error in handleCommand:", error.message);
        api.sendMessage("An error occurred while processing your request.", event.threadID, messageID);
    }
}

async function getAnswerFromAI(question) {
    try {
        const services = [
            // { url: 'https://markdevs-last-api.onrender.com/gpt4', params: { prompt: question, uid: '100058837502078' } },
            // { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', params: { query: question } },
            // { url: 'http://fi5.bot-hosting.net:20538/api/gpt4', params: { query: question } },
            { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', params: { ask: question } }
        ];

        for (const service of services) {
            const data = await fetchFromAI(service.url, service.params);
            if (data) return data;
        }

        throw new Error("No valid response from any AI service");
    } catch (error) {
        console.error("Error in getAnswerFromAI:", error.message);
        throw new Error("Failed to get AI response");
    }
}

async function fetchFromAI(url, params) {
    try {
        const { data } = await axios.get(url, { params });
        if (data && (data.gpt4 || data.reply || data.response || data.answer || data.message)) {
            const response = data.gpt4 || data.reply || data.response || data.answer || data.message;
            console.log("AI Response:", response);
            return response;
        } else {
            throw new Error("No valid response from AI");
        }
    } catch (error) {
        console.error("Network Error:", error.message);
        return null;
    }
}

async function getAIResponse(input) {
    try {
        if (!input || input.trim().length === 0) {
            throw new Error("Empty query");
        }
        const response = await getAnswerFromAI(input);
        return response;
    } catch (error) {
        console.error("Error in getAIResponse:", error.message);
        throw error;
    }
}

module.exports = {
    config: {
        name: 'max',
        version: '1.0',
        hasPermssion: 0,
        usePrefix: false,
        credits: 'max',
        description: 'An AI command!',
        commandCategory: 'ai',
        usages: '[prompt]',
        cooldowns: 0
    },
    run: async function({ api, event, args }) {
        await handleCommand(api, event, args);
    },
    handleEvent: async function({ event, api }) {
        const messageID = event.messageID;

        // Prevent the same message from being processed in both run and handleEvent
        if (processedMessageIDs.has(messageID)) {
            return;
        }

        const messageContent = event.body.trim().toLowerCase();

        if ((event.messageReply && event.messageReply.senderID === api.getCurrentUserID()) ||
            (messageContent.startsWith("max") && event.senderID !== api.getCurrentUserID())) {

            const input = messageContent.replace(/^max\s*/, "").trim();
            await handleCommand(api, event, [input]);
        }
    }
};

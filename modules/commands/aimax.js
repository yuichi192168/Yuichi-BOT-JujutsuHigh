const axios = require('axios');

let lastResponseMessageID = null;

async function handleCommand(api, event, args) {
    try {
        const question = args.join(" ").trim();

        if (!question) {
            return api.sendMessage("Please provide a question to get an answer.", event.threadID, event.messageID);
        }

        const { response, messageID } = await getAIResponse(question, event.senderID, event.messageID);
        lastResponseMessageID = messageID;

        api.sendMessage(response, event.threadID, messageID);
    } catch (error) {
        console.error("Error in handleCommand:", error.message);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
}

async function getAnswerFromAI(question) {
    try {
        const services = [
            { url: 'https://markdevs-last-api.onrender.com/gpt4', params: { prompt: question, uid: '100058837502078' } },
            { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', params: { query: question } },
            { url: 'http://fi5.bot-hosting.net:20538/api/gpt4', params: { query: question } },
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

// async function getAIResponse(input, userId, messageID) {
//     const query = input.trim() || "hi";
//     try {
//         const response = await getAnswerFromAI(query);
//         return { response, messageID };
//     } catch (error) {
//         console.error("Error in getAIResponse:", error.message);
//         throw error;
//     }
// }

module.exports = {
    config: {
        name: 'ai',
        version: '1.0',
        hasPermssion: 0,
        usePrefix:false,
        credits: 'coffee',
        description: 'An AI command!',
        commandCategory: 'ai',
        usages: '[prompt]',
        cooldowns: 0
    },
    run: async function({ api, event, args }) {
        const input = args.join(' ').trim();
        try {
            const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
            lastResponseMessageID = messageID;
            api.sendMessage(response, event.threadID, messageID);
        } catch (error) {
            console.error("Error in run:", error.message);
            api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
        }
    },
    handleEvent: async function({ event, api }) {
        const messageContent = event.body.trim().toLowerCase();

        if ((event.messageReply && event.messageReply.senderID === api.getCurrentUserID()) || (messageContent.startsWith("ai") && event.senderID !== api.getCurrentUserID())) {
            const input = messageContent.replace(/^ai\s*/, "").trim();
            try {
                const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
                lastResponseMessageID = messageID;
                api.sendMessage(response, event.threadID, messageID);
            } catch (error) {
                console.error("Error in handleEvent:", error.message);
                api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
            }
        }
    }
};

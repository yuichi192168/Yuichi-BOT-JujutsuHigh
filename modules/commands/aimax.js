const axios = require('axios');

const services = [
  { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', param: { ask: 'ask' } }
];

async function callService(service, prompt, senderID) {
  try {
    const params = {};
    for (const [key, value] of Object.entries(service.param)) {
      params[key] = key === 'uid' ? senderID : encodeURIComponent(prompt);
    }
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${service.url}?${queryString}`);
    return response.data.answer || response.data;
  } catch (error) {
    console.error(`Service error from ${service.url}: ${error.message}`);
    throw new Error(`Error from ${service.url}: ${error.message}`);
  }
}

async function getFastestValidAnswer(prompt, senderID) {
  const promises = services.map(service => callService(service, prompt, senderID));
  const results = await Promise.allSettled(promises);
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      return result.value;
    }
  }
  throw new Error('All services failed to provide a valid answer');
}

const ArYAN = ['ai', '-ai'];

module.exports = {
  config: {
    name: 'aimax',
    version: '1.0',
    hasPermssion: 0,
    credits: 'Max',
    description: 'An AI command!',
    usePrefix: false,
    commandCategory: 'ai',
    usages: '[prompt]',
    cooldowns: 5,
  },

  onStart: async function () {
    // Empty onStart function
  },

  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = ArYAN.find(p => event.body && event.body.toLowerCase().startsWith(p));
      let prompt;

      // Check if the user is replying to a bot message
      if (event.type === 'message_reply') {
        const replyMessage = event.messageReply;

        // Check if the bot's original message starts with the header
        if (replyMessage.body && replyMessage.body.startsWith(getLang("header"))) {
          // Extract the user's reply from the event
          prompt = event.body.trim();

          // Combine the user's reply with the bot's original message
          prompt = `${replyMessage.body}\n\nUser reply: ${prompt}`;
        } else {
          // If the bot's original message doesn't start with the header, return
          return;
        }
      } else if (prefix) {
        prompt = event.body.substring(prefix.length).trim() || 'hello';
      } else {
        return;
      }

      if (prompt === 'hello') {
        const greetingMessage = `${getLang("header")}\nHello! How can I assist you today?\n${getLang("footer")}`;
        api.sendMessage(greetingMessage, event.threadID, event.messageID);
        console.log('Sent greeting message as a reply to user');
        return;
      }

      try {
        const fastestAnswer = await getFastestValidAnswer(prompt, event.senderID);
        const finalMsg = `${getLang("header")}\n${fastestAnswer}\n${getLang("footer")}`;
        api.sendMessage(finalMsg, event.threadID, event.messageID);
        console.log('Sent answer as a reply to user');
      } catch (error) {
        console.error(`Failed to get answer: ${error.message}`);
        api.sendMessage(
          `${error.message}.`,
          event.threadID,
          event.messageID
        );
      }
    } catch (error) {
      console.error(`Failed to process chat: ${error.message}`);
      api.sendMessage(
        `${error.message}.`,
        event.threadID,
        event.messageID
      );
    }
  }
};

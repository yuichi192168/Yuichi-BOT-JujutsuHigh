 const axios = require('axios');

module.exports.config = {
  name: 'yui',
  version: '1.0',
  hasPermssion: 0,
  credits: 'Max',
  description: 'An AI command!',
  usePrefix: true,
  commandCategory: 'ai',
  usages: '[prompt]',
  cooldowns: 5,
};


module.exports.run = async function({ api, event, args }) {
    const prompt = args.join(' ');
    api.setMessageReaction("⏱️", event.messageID, () => {}, true);

    try {
        // Make a request to OpenAI API through your Express server
        const response = await axios.post('https://api-gojo.yuichi192168.repl.co/api2/chat', { prompt });
        const data = response.data;
        const output = data.reply;

        // Send the OpenAI-generated response to the current thread
        api.sendMessage(output, event.threadID, event.messageID);
        api.setMessageReaction("", event.messageID, () => {}, true);

    } catch (error) {
        console.error('⚠️ Something went wrong:', error);
        api.sendMessage('⚠️ Something went wrong: ' + error.message, event.threadID, event.messageID);
        api.setMessageReaction("⚠️", event.messageID, () => { }, true);
    }
};

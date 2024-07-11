const axios = require('axios');
// Define the logger function
const logger = (message, mode) => {
  console.log(`[${mode}] ${message}`);
};
module.exports.config = {
  name: 'yui2',
  version: '1.0',
  hasPermssion: 2,
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
    const response = await axios.post('https://api-gojo.yuichi192168.repl.co/api2/chat', { prompt });
    const data = response.data;
    const output = data.reply;

    // Logging
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

    logger(
      global.getText(
        "handleCommand",
        "executeCommand",
        new Date().toISOString(), // Use the current timestamp
        command ? command.name : "Unknown",
        event.senderID,
        threadID,
        args.join(" "),
        Date.now()
      ),
      "DEV MODE"
    );

    // Send the OpenAI-generated response to the current thread
    api.sendMessage(output, event.threadID, event.messageID);
    api.setMessageReaction("", event.messageID, () => {}, true);

  } catch (error) {
    console.error('⚠️ Something went wrong:', error);

    // Logging
    logger(
      global.getText(
        "handleCommand",
        "error",
        new Date().toISOString(), // Use the current timestamp
        "yui",
        event.senderID,
        threadID,
        args.join(" "),
        Date.now()
      ),
      "DEV MODE"
    );

    api.sendMessage('⚠️ Something went wrong: ' + error.message, event.threadID, event.messageID);
    api.setMessageReaction("⚠️", event.messageID, () => {}, true);
  }
};

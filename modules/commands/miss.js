module.exports = {
  config: {
    name: "miss",
    version: "1.0.1",
    hasPermission: 0,
    credits: "Max Spencer",
    description: "Responses to trigger words",
    usePrefix: false,
    commandCategory: "No prefix",
    usages: "response",
    cooldowns: 3,
  },

  run: async function ({ api, event }) {
    // Trigger words and their corresponding responses
    const triggerResponses = {
      "miss": [
      "hindi ka naman namiss",
    "kaya ka lng naman namiss kase bored siya",
  "kaya ka lng naman namiss kase walang topic sa kabila",
 "hindi ka miss non, boring ka kase kausap",
"kaya ka lng naman namiss kase tinatanong mo","hindi, maganda kase topic nila sa kabila",
"kaya ka lng naman namiss kase tapos na usapan nila sa kabila"   
        ],
      };
    const body = event.body.toLowerCase();

    for (const triggerWord in triggerResponses) {
      if (body.includes(triggerWord)) {
        const responses = triggerResponses[triggerWord];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        // Send the text response
        setTimeout(() => {
        api.sendMessage(randomResponse, event.threadID);
        }, 5000); 
        console.log(`Sent response for trigger word: ${triggerWord}`);
        break; // Exit the loop after the first match
      }
    }
  },
};
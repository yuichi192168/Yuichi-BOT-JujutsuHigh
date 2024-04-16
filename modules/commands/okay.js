const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "okay",
    version: "1.0.1",
    hasPermission: 0,
    credits: "Max Spencer",
    description: "okay image responses",
    usePrefix: false,
    commandCategory: "No prefix",
    usages: "okay",
    cooldowns: 5,
  },
  

  run: async function ({ api, event }) {
    // Array of meme image URLs
    const memeImages = [
      "https://i.imgur.com/EpjQTNR.jpg",
      "https://i.imgur.com/bBz1TWB.jpg",
      "https://i.imgur.com/3GKmQte.jpg",
      "https://i.imgur.com/zLB00Zf.jpg"
    ];

    // Trigger words to check for in the message
    const triggerWords = ["okay", "okay lng", "okayy", "okayy lng", "okay lang", "okayy lang", "okay langs", "okayy langs"];

    // Check if any of the trigger words are in the message body
    const body = event.body.toLowerCase();
    const matchedWords = triggerWords.filter(word => body.includes(word));
    if (matchedWords.length > 0) {
      // Select a random meme image from the array
      const randomIndex = Math.floor(Math.random() * memeImages.length);
      const selectedMeme = memeImages[randomIndex];

      try {
        // Fetch the selected meme image
        const { data } = await axios.get(selectedMeme, {
          responseType: "arraybuffer",
        });

        // Define the file path to save the image
        const imagePath = __dirname + "/cache/okay.jpg";

        // Write the image data to the file
        fs.writeFileSync(imagePath, Buffer.from(data, "binary"));

        // Create a read stream from the saved image
        const imgStream = fs.createReadStream(imagePath);

        // Prepare the message with the image attachment
        const message = {
          attachment: imgStream
        };

        // Send the message with the meme image
        setTimeout(() => {
        api.sendMessage(message, event.threadID);
        }, 5000); 
        console.log(`Sent meme in response to: ${matchedWords.join(', ')}`);
      } catch (error) {
        console.error("Error sending meme:", error);
      }
    }
  },
};

const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "kiss",
    version: "1.0.1",
    hasPermission: 0,
    credits: "Max Spencer",
    description: "kiss image responses",
    usePrefix: false,
    commandCategory: "No prefix",
    usages: "kiss",
    cooldowns: 0,
  },

  run: async function ({ api, event }) {
    // Array of meme image URLs
    const memeImages = [
      "https://i.imgur.com/VrYlCe2.jpg",
      "https://i.imgur.com/k1hJRFE.jpg",
      "https://i.imgur.com/cobQRNR.jpg",
      "https://i.imgur.com/MuZCUOa.jpg",
      "https://i.imgur.com/bVYo6od.jpg",
      "https://i.imgur.com/p0TWjUJ.jpg",
      "https://i.imgur.com/RitENgS.jpg",
      "https://i.imgur.com/CpgrnxH.jpg",
      "https://i.imgur.com/oYPGagl.jpg",
      "https://i.imgur.com/7m5i1sw.jpg"
    ];

    // Trigger words to check for in the message
    const triggerWords = ["kiss"];

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
        const imagePath = __dirname + "/cache/kiss.jpg";

        // Write the image data to the file
        fs.writeFileSync(imagePath, Buffer.from(data, "binary"));

        // Create a read stream from the saved image
        const imgStream = fs.createReadStream(imagePath);

        // Prepare the message with the image attachment
        const message = {
          body: "kiss?",
          attachment: imgStream
        };

        // Send the message with the meme image and text response
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

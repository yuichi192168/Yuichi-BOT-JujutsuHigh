const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "catmeme",
    version: "1.0.1",
    hasPermission: 0,
    credits: "Max Spencer",
    description: "catmeme image responses",
    usePrefix: false,
    commandCategory: "No prefix",
    usages: "okay",
    cooldowns: 5,
  },


  run: async function ({ api, event }) {
    // Array of meme image URLs
    const memeImages = [
      "https://imgur.com/ron18RY.jpg",
      "https://imgur.com/LDaMBU3.jpg",
      "https://imgur.com/vowBl59.jpg",
      "https://imgur.com/rGxKac0.jpg",
      "https://imgur.com/V9eLv8u.jpg",
      "https://imgur.com/ZzEG5aV.jpg",
      "https://imgur.com/RFmNrrj.jpg",
      "https://imgur.com/ZSdxoCX.jpg",
      "https://imgur.com/I00BhmY.jpg",
      "https://imgur.com/LijTPAZ.jpg",
      "https://imgur.com/Komnrpj.jpg",
      "https://imgur.com/QOvAX6R.jpg",
      "https://imgur.com/d2Z79IB.jpg",
      "https://imgur.com/govAkfT.jpg",
      "https://imgur.com/0q0QQxl.jpg",
      "https://imgur.com/cnaboXN.jpg",
      "https://imgur.com/LI18Xg0.jpg",
      "https://imgur.com/C9vH1s9.jpg",
      "https://imgur.com/ng7gQmv.jpg",
      "https://imgur.com/VLIooiS.jpg",
      "https://imgur.com/P1IgGck.jpg",
      "https://imgur.com/5AbMEdD.jpg",
      "https://imgur.com/G1Vl5zp.jpg",
      "https://imgur.com/3w84eEU.jpg",
      "https://imgur.com/TmTZ8dm.jpg",
      "https://imgur.com/yinGnVw.jpg",
      "https://imgur.com/jrcjDFE.jpg",
      "https://imgur.com/022RXpD.jpg",
      "https://imgur.com/9UDOYS2.jpg",
      "https://imgur.com/9yGjtKf.jpg"      
    ];

    // Trigger words to check for in the message
    const triggerWords = ["catmeme"];

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
        const imagePath = __dirname + "/cache/catmeme.jpg";

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
        console.log(`Sent cat meme in response to: ${matchedWords.join(', ')}`);
      } catch (error) {
        console.error("Error sending cat meme:", error);
      }
    }
  },
};

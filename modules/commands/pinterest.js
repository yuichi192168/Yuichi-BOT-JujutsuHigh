const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

// Function to get base API URL for the fourth API
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
  );
  return base.data.api;
};

// Function to fetch images from an API
const fetchImages = async (url, numberSearch, fetchedImageUrls) => {
  const { data } = await axios.get(url);

  if (Array.isArray(data) && data.length > 0) {
    return await Promise.all(data.slice(0, numberSearch).map(async (item, i) => {
      const imageUrl = item.image || item;
      if (!fetchedImageUrls.includes(imageUrl)) {
        fetchedImageUrls.push(imageUrl);
        try {
          const { data: imgBuffer } = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const imgPath = path.join(__dirname, 'tmp', `${i + 1}.jpg`);
          await fs.outputFile(imgPath, imgBuffer);
          return fs.createReadStream(imgPath);
        } catch (error) {
          console.error(`Error downloading image from ${imageUrl}:`, error);
          return null;
        }
      } else {
        return null;
      }
    }));
  } else {
    return [];
  }
};

module.exports.config = {
  name: "pinterest",
  version: "1.0.0",
  hasPermission: 0,
  credits: "D-Jukie",
  description: "Search for images",
  usePrefix: true,
  commandCategory: "ai",
  usages: "[Text]",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const keySearch = args.join(" ");
  if (!keySearch.includes("-")) {
    return api.sendMessage('Please enter in the format: search keyword - number of images to search', event.threadID, event.messageID);
  }
  const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
  let numberSearch = parseInt(keySearch.split("-").pop().trim()) || 1;
  numberSearch = Math.min(Math.max(numberSearch, 1), 12); // Ensure the range is between 1 and 12

  const tmpDir = path.join(__dirname, 'tmp');
  await fs.ensureDir(tmpDir);

  try {
    let imgData = [];
    let fetchedImageUrls = [];

    // Attempt to fetch images from the first API
    try {
      imgData = await fetchImages(`https://api-samirxyz.onrender.com/api/Pinterest?query=${encodeURIComponent(keySearchs)}&number=${numberSearch}&apikey=global`, numberSearch, fetchedImageUrls);
    } catch (error) {
      console.error("Error fetching images from first API:", error);
    }

    // If no images were fetched from the first API, try the second API
    if (imgData.length === 0) {
      try {
        imgData = await fetchImages(`https://celestial-dainsleif-v2.onrender.com/pinterest?pinte=${encodeURIComponent(keySearchs)}`, numberSearch, fetchedImageUrls);
      } catch (error) {
        console.error("Error fetching images from second API:", error);
      }
    }

    // If still no images, try the new third API
    if (imgData.length === 0) {
      try {
        imgData = await fetchImages(`https://itsaryan.onrender.com/api/pinterest?query=${encodeURIComponent(keySearchs)}&limits=${numberSearch}`, numberSearch, fetchedImageUrls);
      } catch (error) {
        console.error("Error fetching images from third API:", error);
      }
    }

    // If still no images, try the fourth API
    if (imgData.length === 0) {
      try {
        const baseApi = await baseApiUrl();
        imgData = await fetchImages(`${baseApi}/pinterest?search=${encodeURIComponent(keySearchs)}&limit=${numberSearch}`, numberSearch, fetchedImageUrls);
      } catch (error) {
        console.error("Error fetching images from fourth API:", error);
      }
    }

    if (!imgData || imgData.length === 0) {
      throw new Error("No images found.");
    }

    await api.sendMessage({
      attachment: imgData.filter(img => img !== null),
      body: `Here are the top ${imgData.length} image results for "${keySearchs}":`
    }, event.threadID, event.messageID);

  } catch (error) {
    console.error("Error in Pinterest bot:", error);
    if (error.message === "No images found.") {
      return api.sendMessage("(⁠ ⁠･ั⁠﹏⁠･ั⁠) can't fetch images, api dead.", event.threadID, event.messageID);
    } else {
      return api.sendMessage(`📷 | ${error.message}`, event.threadID, event.messageID);
    }
  } finally {
    // Clean up the temporary files
    await fs.remove(tmpDir);
  }
};

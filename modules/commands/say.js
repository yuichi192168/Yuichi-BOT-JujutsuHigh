module.exports.config = {
  name: "say",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Max",
  description: "Text to voice speech messages en for english  ko for korean ja for japanese tl for tagalog fr for french es for spanish hi for hindi",
  usePrefix: true,
  commandCategory: "ai",
  usages: "Text to speech messages",
  cooldowns: 5,
  dependencies: {
    "path": "",
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  try {
    const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");

    // Define an object with language codes and their corresponding prefixes.
    const languagePrefixes = {
      "en": ["en", "english"],
      "ru": ["ru", "russian"],
      "ko": ["ko", "korean"],
      "ja": ["ja", "japanese"],
      "tl": ["tl", "tagalog"], 
      "fr": ["fr", "french"],
      "es": ["es", "spanish"],
      "hi": ["hi", "hindi"],
    };

    // Extract the language code from the content.
    let languageToSay = null;

    for (const code in languagePrefixes) {
      if (languagePrefixes[code].some(prefix => content.startsWith(prefix))) {
        languageToSay = code;
        break;
      }
    }

    if (!languageToSay) {
      // If no valid language code is provided, default to global.config.language.
      languageToSay = global.config.language;
    }

    // Extract the message to be spoken (excluding the language prefix).
    var msg = content.slice(languagePrefixes[languageToSay].find(prefix => content.startsWith(prefix)).length).trim();

    const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
    await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, path);

    return api.sendMessage({
      attachment: createReadStream(path)
    }, event.threadID, () => unlinkSync(path), event.messageID);
  } catch (e) {
    console.log(e);
  }
};

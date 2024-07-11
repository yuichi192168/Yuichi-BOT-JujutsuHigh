const request = require("request");
const axios = require("axios");
const { writeFileSync, createReadStream } = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "resend",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Thọ & Mod By DuyVuong",
  description: "Resends Messages",
  usePrefix: true,
  commandCategory: "System",
  usages: "resend",
  cooldowns: 3,
  hide: true,
  dependencies: {
    request: "",
    "fs-extra": "",
    axios: ""
  }
};

module.exports.handleEvent = async function ({ event, api, client, Users }) {
  let { messageID, senderID, threadID, body: content } = event;
  if (!global.logMessage) global.logMessage = new Map();
  if (!global.data.botID) global.data.botID = await api.getCurrentUserID();

  const thread = global.data.threadData.get(parseInt(threadID)) || {};

  if (senderID == global.data.botID) return;

  if (event.type !== "message_unsend") {
    global.logMessage.set(messageID, {
      msgBody: content,
      attachment: event.attachments
    });
  } else {
    const getMsg = global.logMessage.get(messageID);
    if (!getMsg) return;
    let name = await Users.getNameUser(senderID);

    if (!getMsg.attachment[0]) {
      setTimeout(() => {
        api.sendMessage(`${name} unsent a message \n\nPossible reasons: nagsilos, may nakita, nabasa ng loha, naghost, iniwan, pinagpalit, xsend, may nalaman\n\nContent: ${getMsg.msgBody}`, threadID);
      }, 10000);
    } else {
      let num = 0;
      let msg = {
        body: `${name} unsent a message \n${getMsg.attachment.length} Attachments${getMsg.msgBody ? `\n\nContent: ${getMsg.msgBody}` : ""}`,
        attachment: [],
        mentions: [{ tag: name, id: senderID }]
      };

      for (let i of getMsg.attachment) {
        num += 1;
        try {
          const { data } = await axios.get(i.url, { responseType: 'arraybuffer' });
          const ext = path.extname(i.url);
          const filePath = path.join(__dirname, `/cache/${num}${ext}`);
          writeFileSync(filePath, Buffer.from(data, "utf-8"));
          msg.attachment.push(createReadStream(filePath));
        } catch (error) {
          console.error(`Error downloading attachment: ${error}`);
        }
      }

      setTimeout(() => {
        api.sendMessage(msg, threadID);
      }, 10000);
    }
  }
};

module.exports.run = async function ({ api, event, Threads }) {
  const { threadID, messageID } = event;
  const data = (await Threads.getData(threadID)).data;

  data["resend"] = true;

  await Threads.setData(parseInt(threadID), { data });
  global.data.threadData.set(parseInt(threadID), data);

  return api.sendMessage(`Resend is now enabled successfully!`, threadID, messageID);
};

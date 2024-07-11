module.exports.config = {
  name: "pinterest",
  version: "1.0.0",
  hasPermission: 0,
  credits: "D-Jukie",
  description: "Search for images",
  usePrefix: true,
  commandCategory: "For users",
  usages: "[Text]",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  const keySearch = args.join(" ");
  if (!keySearch.includes("-")) {
      return api.sendMessage('Please enter in the format: search keyword - number of images to search', event.threadID, event.messageID);
  }
  const keySearchs = keySearch.substr(0, keySearch.indexOf('-'));
  const numberSearch = keySearch.split("-").pop() || 6;
  const res = await axios.get(`https://api.sdwdewhgdjwwdjs.repl.co/pinterest?search=${encodeURIComponent(keySearchs)}`);
  const data = res.data.data;
  let num = 0;
  let imgData = [];
  for (let i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${num += 1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
  }
  api.sendMessage({
      attachment: imgData,
      body: `${numberSearch} search results for keyword: ${keySearchs}`
  }, event.threadID, event.messageID);
  for (let ii = 1; ii < parseInt(numberSearch); ii++) {
      fs.unlinkSync(__dirname + `/cache/${ii}.jpg`);
  }
};

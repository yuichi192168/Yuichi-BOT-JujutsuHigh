const fs = require("fs");
module.exports.config = {
  name: "autoreact",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "John Lester", 
  description: "No Prefix",
  commandCategory: "No prefix",
  usePrefix: false,
  cooldowns: 2, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase()
  if (event.body.indexOf("hi")==0 || event.body.indexOf("hi.")==0 || event.body.indexOf("hii")==0 || event.body.indexOf("hiii")==0 || event.body.indexOf("hai")==0 || event.body.indexOf("hey")==0 || event.body.indexOf("heyy")==0 || event.body.indexOf("hi po")==0 || event.body.indexOf("hi phoe")==0 || event.body.indexOf("hii po")==0 || event.body.indexOf("hi morning")==0 || event.body.indexOf("hi morningg")==0 || event.body.indexOf("hi morninggg")==0 || event.body.indexOf("gm")==0 || event.body.indexOf("Gmorning")==0 || event.body.indexOf("Goodmorning")==0 || event.body.indexOf("goodmorning")==0 || event.body.indexOf("goodmorninggg")==0 || event.body.indexOf("Morning")==0 || event.body.indexOf("morningg")==0 || event.body.indexOf("hello")==0 || event.body.indexOf("hello po")==0 || event.body.indexOf("hello morning")==0 || event.body.indexOf("hello morningg")==0 || event.body.indexOf("hello po")==0 || event.body.indexOf("low")==0 || event.body.indexOf("low")==0 || event.body.indexOf("high")==0 || event.body.indexOf("bf")==0 || event.body.indexOf("breakfast")==0 || event.body.indexOf("breakfast na")==0 || event.body.indexOf("good noon")==0 || event.body.indexOf("goodaftie")==0 || event.body.indexOf("good aftie")==0 || event.body.indexOf("aft")==0 || event.body.indexOf("aftie")==0 || event.body.indexOf("aftiee")==0 || event.body.indexOf("afternoon")==0 || event.body.indexOf("goodafternoon")==0 ||event.body.indexOf("good afternoon")==0 || event.body.indexOf("good eve")==0 || event.body.indexOf("good evening")==0 || event.body.indexOf("eve")==0 || event.body.indexOf("evening")==0 || event.body.indexOf("eveningg")==0 || event.body.indexOf("dinner")==0 || event.body.indexOf("done")==0 || event.body.indexOf("fh")==0 || event.body.indexOf("lunch")==0 || event.body.indexOf("lunch po")==0 || event.body.indexOf("musta")==0 || event.body.indexOf("gtk")==0 || event.body.indexOf("yo")==0 || event.body.indexOf("yo.")==0 || event.body.indexOf("yow")==0 || event.body.indexOf("sup")==0 || event.body.indexOf("kumusta?")==0 || event.body.indexOf("ey")==0 || event.body.indexOf("eyy")==0 || event.body.indexOf("eyyy")==0 || event.body.indexOf("wc")==0 || event.body.indexOf("syug")==0 || event.body.indexOf("guys")==0 || event.body.indexOf("kain?")==0 || event.body.indexOf("kain po")==0 || event.body.indexOf("eat")==0 || event.body.indexOf("eat po")==0 || event.body.indexOf("eat?")==0 || event.body.indexOf("snacks")==0 || event.body.indexOf("meryenda")==0 || event.body.indexOf("kain na")==0 ||event.body.indexOf("musta kayo?")==0 && !bot.includes(event.senderID))  {
    var msg = {
        body: ""
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💗", event.messageID, (err) => {}, true)
    };
  if (event.body.indexOf("sad")==0 || event.body.indexOf("Sad")==0 || event.body.indexOf(":(")==0 || event.body.indexOf("malungkot")==0 || event.body.indexOf("Malungkot")==0 || event.body.indexOf("Umay")==0 || event.body.indexOf("ayaw ko na")==0 || event.body.indexOf("Ayaw ko na")==0 || event.body.indexOf("gusto ko ng mamatay")==0 || event.body.indexOf("stress")==0 || event.body.indexOf("Stress")==0 || event.body.indexOf("Gusto ko nang mamatay")==0 || event.body.indexOf("mamatay na lang ako")==0 || event.body.indexOf("Mamatay na lang ako")==0 || event.body.indexOf("bwesit talaga")==0 || event.body.indexOf("hayst")==0 || event.body.indexOf("Hayst")==0 ||  event.body.indexOf("mamatay na lahat ng mga")==0 || event.body.indexOf("Mamatay na lahat ng mga")==0 || event.body.indexOf("buti pa")==0 || event.body.indexOf("Buti pa")==0 || event.body.indexOf("sana namatay")==0 || event.body.indexOf("Sana namatay")==0 || event.body.indexOf("umay")==0 || event.body.indexOf("nakakalungkot")==0 || event.body.indexOf("Nakakalungkot")==0 || event.body.indexOf("sakit")==0 || event.body.indexOf("Sakit")==0 ||  event.body.indexOf("😞")==0 || event.body.indexOf("😨")==0 || event.body.indexOf("😥")==0 || event.body.indexOf("😭")==0 || event.body.indexOf("😓")==0 || event.body.indexOf("😢")==0 || event.body.indexOf("😕")==0 || event.body.indexOf("😑")==0 || event.body.indexOf("😩")==0 || event.body.indexOf("😰")==0 || event.body.indexOf("😟")==0 || event.body.indexOf("😦")==0 || event.body.indexOf("hindi na ako")==0 || event.body.indexOf("Hindi na ako")==0 || event.body.indexOf("nakakainggit")==0 || event.body.indexOf("agoy")==0 || event.body.indexOf("aguyy")==0 || event.body.indexOf("ayoko")==0 || event.body.indexOf("wag kana")==0 || event.body.indexOf("ayoko na")==0 || event.body.indexOf("sorry ganito lng ako")==0 || event.body.indexOf("sakitt")==0 || event.body.indexOf("sakit mo")==0 || event.body.indexOf("sucket")==0 || event.body.indexOf("tarantado na yan")==0 && !bot.includes(event.senderID))  {
    setTimeout(() => {
    var msg = {
        body: "lungkot naman ng buhay mo"
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😢", event.messageID, (err) => {}, true);
      }, 5000); // 5,000 milliseconds (5 seconds) delay
    };
  if (event.body.indexOf("bobo")==0 || event.body.indexOf("Bobo")==0 || event.body.indexOf("gago")==0 || event.body.indexOf("Gago")==0 || event.body.indexOf("suntukan")==0 || event.body.indexOf("kantutin")==0 || event.body.indexOf("hayop")==0 || event.body.indexOf("kantutin")==0 || event.body.indexOf("Hayop")==0 || event.body.indexOf("hindot")==0 || event.body.indexOf("Hayup")==0 || event.body.indexOf("hayup")==0 || event.body.indexOf("tangina")==0 || event.body.indexOf("Tangina")==0 || event.body.indexOf("tang ina")==0 || event.body.indexOf("Tang ina")==0 || event.body.indexOf("bwesit")==0 || event.body.indexOf("Bwesit")==0 || event.body.indexOf("Piste")==0 || event.body.indexOf("piste")==0 || event.body.indexOf("argh")==0 || event.body.indexOf("pota")==0 || event.body.indexOf("Pota")==0 || event.body.indexOf("puta")==0 || event.body.indexOf("fuckyou")==0 || event.body.indexOf("pakyu")==0 || event.body.indexOf("pakyo")==0 || event.body.indexOf("may bold")==0 || event.body.indexOf("kingina")==0 || event.body.indexOf("Kingina")==0 || event.body.indexOf("King ina")==0 || event.body.indexOf("HAHAHA")==0 || event.body.indexOf("May bold")==0 || event.body.indexOf("baliw")==0 || event.body.indexOf("bubu")==0 || event.body.indexOf("mabaho")==0 || event.body.indexOf("Mabaho")==0 || event.body.indexOf("manyakis")==0 || event.body.indexOf("manyakol")==0 ||event.body.indexOf("ambobo")==0 || event.body.indexOf("walang utak")==0 || event.body.indexOf("Walang utak")==0 || event.body.indexOf("send bold")==0 || event.body.indexOf("Send bold")==0 || event.body.indexOf("😆")==0 || event.body.indexOf("😂")==0 || event.body.indexOf("🤣")==0 || event.body.indexOf("bts biot")==0 || event.body.indexOf("bts")==0 || event.body.indexOf("BTS")==0 || event.body.indexOf("Bts")==0 || event.body.indexOf("bold ni")==0 || event.body.indexOf("Bold ni")==0 || event.body.indexOf("may bold si")==0 || event.body.indexOf("May bold si")==0 || event.body.indexOf("deputa")==0 || event.body.indexOf("Deputa")==0 || event.body.indexOf("hahaha")==0 || event.body.indexOf("amp")==0 || event.body.indexOf("Amp")==0 || event.body.indexOf("tanga")==0 || event.body.indexOf("Tanga")==0 || event.body.indexOf("bastos")==0 || event.body.indexOf("Bastos")==0 || event.body.indexOf("Punyeta")==0 || event.body.indexOf("punyeta")==0 || event.body.indexOf("Hahaha")==0 && !bot.includes(event.senderID))  {
    var msg = {
        body: ""
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😆", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }

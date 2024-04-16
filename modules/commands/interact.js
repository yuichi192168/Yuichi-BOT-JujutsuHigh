module.exports.config = {
  name: "interact",
  version: "2.0.2",
  permissions: 0,
  credits: "Max Spencer",
  description: "No prefix",
  usePrefix: false,
  commandCategory: "No prefix",
  usages: ["interact"],
  cooldown: 5,
};

module.exports.handleEvent = function ({ api, event, client, __GLOBAL }) {
  var { threadID, messageID, body } = event;

  // Last chat
  let lastChat = [
    "lc",
    "last chat",
    "ako na lc",
    "ako na last chat",
    "lc ako",
    "last chat ako",
    "lc em",
  ];

  if (body && typeof body === "string" && body.trim() !== "") {
    if (lastChat.includes(body.toLowerCase())) {
      let lcVar = [
        "ako na, don't say that. you're more than just a last chat. everytime na maiisip mo na last chat ka no! you're a wonderful person and i appreciate you so much. hindi biro maging last chat. It must've been tough pero u did it. you're so strong kaya sobrang proud kami sayo.i know what you feel, yung feeling na maging last chat pero always remember you're a strong person. nakayanan mo ang lahat ng ito, if feeling mo magiging last chat ka nagchachat ka pa rin, we're so proud of you kaya you deserve a respect. you're an independent person. we love you so much.",
        "salo kona last chat, ako naman palagi eh, palibhasa iniwan, pinaasa, di pinaglaban, di crinushback, at pampalipas oras lang naman ako, wala din namang nag mamahal sakin, sino ba naman ako",
        "𝐒𝐀𝐆𝐈𝐏 𝐊𝐎𝐍𝐀 𝐋𝐀𝐒𝐓 𝐂𝐇𝐀𝐓\n\nTo be the last chat is such an honor and responsibility. If I were to be the last chat, I will use my chat to influence the youth, I will raise awareness to certain causes like Last chat awareness, I wanna show the world, my internet friends rather that I'm confidently cute to be the last chat",
      ]; // Add your desired responses
      let lcRes = lcVar[Math.floor(Math.random() * lcVar.length)];
      // Delay the response by 3 seconds
      setTimeout(() => {
        api.sendMessage(lcRes, threadID, messageID);
        api.setMessageReaction("😆", event.messageID, (err) => {}, true);
   }, 10000); // 10000 milliseconds (10 seconds)
  }
  // Hakdog
  let ha = ["ha", "ha?", "haa", "ha??", "haa?"];

  if (body && typeof body === "string" && body.trim() !== "") {
    if (ha.includes(body.toLowerCase())) {
      let haVar = [
        "hatdog HAHAHAHA",
        "halika dito hilutin kita, alam kong bali bali na yang buto mo kakahulog sa maling tao",
        "hatdog",
        "hakdog",
        "H A T D O G",
        "ha labyo yieee",
        "halaman",
        "hamburger HAHAHAHAHA",
        "hangin",
        "hanggang friend nalang ba talaga",
        "hanjibaluktot yalubog yalutang",
        "handa kong ibigay lahat ng yaman sa mundo, handa akong makipaglaban para lng sa iyong gusto, handa ako na sumugal, handang mamatay para sa iyo kung kailangan, ako ang super hero mo, handa kang ipaglaban",
      ]; // Add your desired responses
      let haRes = haVar[Math.floor(Math.random() * haVar.length)];
       setTimeout(() => {
            api.sendMessage(haRes, threadID, messageID);
            api.setMessageReaction("😆", event.messageID, (err) => {}, true);
       }, 5000); // 5000 milliseconds (5 seconds)
      }
  // bakit
  let bakit = ["bakit", "ansabe?", "ano raw", "anuraw?", "nuraw?","nani?","what?","ano?","anyare?","anong nangyare?","bakit?","bakit kaya","why?"];

  if (body && typeof body === "string" && body.trim() !== "") {
    if (bakit.includes(body.toLowerCase())) {
      let bakitVar = [
        "tanong mo sa pagong","punta ka na lng sa settings tapos hanapin mo yung pake ko","tanong mo sa pagong, baka alam nya, pag hindi sumagot punta ka na lng sa settings tapos hanapin mo yung pake ko"
      ]; // Add your desired responses
      let bakitRes = bakitVar[Math.floor(Math.random() * bakitVar.length)];
       setTimeout(() => {
            api.sendMessage(bakitRes, threadID, messageID);
            api.setMessageReaction("😆", event.messageID, (err) => {}, true);
       }, 5000); // 5000 milliseconds (5 seconds)
      }
  // bye
  let bye = ["maya na lang", "brb", "bounce na me", "bye","byee","byeee","babye","babay","babyee","babyeee","alis na ko","later","alis muna ko","charge lng ako","charge lng muna ako","charge muna ako","may pupuntahan pa ko","charge lng"];

  if (body && typeof body === "string" && body.trim() !== "") {
    if (bye.includes(body.toLowerCase())) {
      let byeVar = [
        "take your time, balik ka na lng kapag wala na kayong matopic sa kabila","take your time💗","ingatt baka habulin ng aso","balik ka na lng kapag wala na kayong matopic sa kabila","balik ka na lang kapag miss mo na ko","balik ka na lng kapag iniwan ka na","balik ka na lng kapag wala na kayo","balik ka na lang kapag hindi na siya yung icing sa ibabaw ng cupcake mo","balik ka na lang kapag hindi na siya yung knight and shining armor mo","balik ka na lng kapag hindi na siya yung star ng pasko mo","balik ka na lang kapag naghost ka na","balik ka na lng kapag wala ng kayo","balik ka na lang kapag no choice ka na","balik ka na lng kapag bored ka na"
      ]; // Add your desired responses
      let byeRes = byeVar[Math.floor(Math.random() * byeVar.length)];
       setTimeout(() => {
            api.sendMessage(byeRes, threadID, messageID);
            api.setMessageReaction("😆", event.messageID, (err) => {}, true);
       }, 5000); // 5000 milliseconds (5 seconds)
      }
  // hahahaha
  let haha = ["haha", "hahaha?", "hahahaha", "hahahahaha","hahahahahaha","HAHA","HAHAHA","HAHAHAHA","HAHAHAHAHA","HAHAHAHAHAHA","HAHAHAHAHAHAHA","HSHSHSHSHS","hshshshshs"];

  if (body && typeof body === "string" && body.trim() !== "") {
    if (haha.includes(body.toLowerCase())) {
      let hahaVar = [
        "masiyado ka ng masaya, happy pill mo ko noh","wag ka na","tawang tawa ah baka mabaliw ka niyan","tawa ka ng tawa, takas ka sa mental noh"
      ]; // Add your desired responses
      let hahaRes = hahaVar[Math.floor(Math.random() * hahaVar.length)];
       setTimeout(() => {
            api.sendMessage(hahaRes, threadID, messageID);
            api.setMessageReaction("😆", event.messageID, (err) => {}, true);
       }, 5000); // 5000 milliseconds (5 seconds)
      }
  //bot
  let bot = ["bot", "bot ka?", "bot ka ba?", "BOT","bot bayan","bot ka ba","bot ka ba talaga","kapangit nang sinsabi ng bot","bot niya","chat bot","bot niyo","pinagsasabi nitong bot","ambagal ng bot","inanetong bot na to","tanginang bot yan","pangit ng bot","bilis ng bot","bot?","bot??"];

  if (body && typeof body === "string" && body.trim() !== "") {
    if (bot.includes(body.toLowerCase())) {
      let botVar = [
        "bot ka nang bot, botasin ko tagiliran mo eh","bot ka nang bot, umpog ko ulo mo eh","bot ka nang bot, gusto mo itupi kita sa walo","bot ka nang bot, hindi nga ako si bot"
      ]; // Add your desired responses
      let botRes = botVar[Math.floor(Math.random() * botVar.length)];
       setTimeout(() => {
            api.sendMessage(botRes, threadID, messageID);
            api.setMessageReaction("😆", event.messageID, (err) => {}, true);
       }, 5000); // 5000 milliseconds (5 seconds)
      }
  //gusto
  let gusto = ["gusto nya rin ako","gusto","gusto nya ba ko?","crush nya rin ako","crush nya ko","crush ako","crush niya ko","crush niya rin ako"];

  if (body && typeof body === "string" && body.trim() !== "") {
    if (gusto.includes(body.toLowerCase())) {
      let gustoVar = [
        "kaya ka lng naman gusto kase bored siya",
        "kaya ka lng naman gusto kase wala na silang matopic sa kabila",
        "kaya ka lng naman gusto kase pampalipas oras ka lng niya",
        "kaya ka lng naman gusto kase tinatanong mo",
        "kaya ka lng naman gusto kase no choice na siya",
        "kaya ka lng naman gusto ko kase pampalipas oras ka lng"
      ]; // Add your desired responses
      let gustoRes = gustoVar[Math.floor(Math.random() * gustoVar.length)];
       setTimeout(() => {
            api.sendMessage(lcRes, threadID, messageID);
            api.setMessageReaction("😆", event.messageID, (err) => {}, true);
       }, 5000); // 5000 milliseconds (5 seconds)
    }
  }
  }
  }
  }
  }
  }
  }
  };
    
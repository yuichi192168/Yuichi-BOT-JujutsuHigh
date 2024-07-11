module.exports.config = {
  name: "help",
  version: "1.0.2",
  hasPermssion: 2, 
  credits: "Mirai Team & Mod by Max Spencer",
  description: "Beginner's Guide",
  usePrefix: true,
  commandCategory: "system",
  usages: "[Shows Commands]",
  cooldown: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 3
  }
};

module.exports.languages = {
  en: {
    moduleInfo:
      "「 %1 」\n%2\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 ",
    helpList:
      `There are %1 commands and %2 categories on this bot.`,
    guideList:
      `Use: "%1${this.config.name} command" to know how to use that command!\nType: "%1${this.config.name} page_number " to show that page contents!`,
    user: "User",
    adminGroup: "Admin group",
    adminBot: "Admin bot",
  },
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0)
    return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;
  return api.sendMessage(
    getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${
        command.config.usages ? command.config.usages : ""
      }`,
      command.config.commandCategory,
      command.config.cooldown,
      command.config.hasPermissions === 0
        ? getText("user")
        : command.config.hasPermissions === 1
        ? getText("adminGroup")
        : getText("adminBot"),
      command.config.credits
    ),
    threadID,
    messageID
  );
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = module.exports.config.envConfig; // Access config properly
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  if (!command) {
    const commandList = Array.from(commands.values());
    const categories = new Set(commandList.map((cmd) => cmd.config.commandCategory.toLowerCase()));
    const categoryCount = categories.size;

    const categoryNames = Array.from(categories);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(categoryNames.length / itemsPerPage);

    let currentPage = 1;
    if (args[0]) {
      const parsedPage = parseInt(args[0]);
      if (
        !isNaN(parsedPage) &&
        parsedPage >= 1 &&
        parsedPage <= totalPages
      ) {
        currentPage = parsedPage;
      } else {
        return api.sendMessage(
          `Oops! You went too far! Please choose a page between 1 and ${totalPages}`,
          threadID,
          messageID
        );
      }
    }
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleCategories = categoryNames.slice(startIdx, endIdx);

    let msg = "";
    for (let i = 0; i < visibleCategories.length; i++) {
      const category = visibleCategories[i];
      const categoryCommands = commandList.filter(
        (cmd) =>
          cmd.config.commandCategory.toLowerCase() === category
      );
      const commandNames = categoryCommands.map((cmd) => cmd.config.name);
      const numberFont = [
        "►",
        "►",
        "►",
        "►",
        "►",
      ];
      msg += ` ${numberFont[i]} ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }\n → ${commandNames.join(", ")}\n`;
    }

    const numberFontPage = [
      "1",
      "2",
      "3",
      "4",
      "5",
    ];
    msg += `
 Page ${numberFontPage[currentPage - 1]} of ${
      numberFontPage[totalPages - 1]
    } \n`;
    msg += getText("helpList", commands.size, categoryCount, prefix);

    return api.sendMessage(
      msg,
      threadID,
      messageID
    );
  } else {
    return api.sendMessage(
      getText(
        "moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${
          command.config.usages ? command.config.usages : ""
        }`,
        command.config.commandCategory,
        command.config.cooldown,
        command.config.hasPermissions === 0
          ? getText("user")
          : command.config.hasPermissions === 1
          ? getText("adminGroup")
          : getText("adminBot"),
        command.config.credits
      ),
      threadID, messageID
    );
  }
};

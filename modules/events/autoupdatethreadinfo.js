module.exports.config = {
    name: "autoUpdateThreadInfo",
    version: "1.4",
    hasPermission: 0,
    credits: "NTKhang",
    description: "Auto update thread info based on events",
    commandCategory: "events",
    cooldowns: 0,
};

module.exports.handleEvent = async function({ api, event, Threads }) {
    const types = ["log:subscribe", "log:unsubscribe", "log:thread-admins", "log:thread-name", "log:thread-image", "log:thread-icon", "log:thread-color", "log:user-nickname"];
    if (!types.includes(event.logMessageType)) return;

    const { threadID, logMessageData, logMessageType } = event;
    const threadInfo = await Threads.getData(threadID);
    let { members, adminIDs } = threadInfo;

    switch (logMessageType) {
        case "log:subscribe":
            const { addedParticipants } = logMessageData;
            const threadInfo_Fca = await api.getThreadInfo(threadID);
            await Threads.setData(threadID, { threadInfo_Fca });

            for (const user of addedParticipants) {
                let oldData = members.find(member => member.userID === user.userFbId);
                const isOldMember = !!oldData;
                oldData = oldData || {};

                const { userInfo, nicknames } = threadInfo_Fca;
                const newData = {
                    userID: user.userFbId,
                    name: user.fullName,
                    gender: userInfo.find(u => u.id == user.userFbId)?.gender,
                    nickname: nicknames[user.userFbId] || null,
                    inGroup: true,
                    count: oldData.count || 0
                };

                if (!isOldMember) {
                    members.push(newData);
                } else {
                    const index = members.findIndex(member => member.userID === user.userFbId);
                    members[index] = newData;
                }
            }
            await Threads.setData(threadID, { members });
            break;

        case "log:unsubscribe":
            const oldData = members.find(member => member.userID === logMessageData.leftParticipantFbId);
            if (oldData) {
                oldData.inGroup = false;
                await Threads.setData(threadID, { members });
            }
            break;

        case "log:thread-admins":
            if (logMessageData.ADMIN_EVENT === "add_admin") {
                adminIDs.push(logMessageData.TARGET_ID);
            } else {
                adminIDs = adminIDs.filter(uid => uid !== logMessageData.TARGET_ID);
            }
            adminIDs = [...new Set(adminIDs)];
            await Threads.setData(threadID, { adminIDs });
            break;

        case "log:thread-name":
            await Threads.setData(threadID, { name: logMessageData.name });
            break;

        case "log:thread-image":
            await Threads.setData(threadID, { imageSrc: logMessageData.url });
            break;

        case "log:thread-icon":
            await Threads.setData(threadID, { emoji: logMessageData.thread_icon });
            break;

        case "log:thread-color":
            await Threads.setData(threadID, { threadThemeID: logMessageData.theme_id });
            break;

        case "log:user-nickname":
            const { participant_id, nickname } = logMessageData;
            const member = members.find(member => member.userID === participant_id);
            if (member) {
                member.nickname = nickname;
                await Threads.setData(threadID, { members });
            }
            break;

        default:
            break;
    }
};

module.exports.run = function() {
    // This function can be empty, as it's just an event handler
};

const {pollfile} = require("./init_feature_essentials");
const {voterslistfile} = require("./init_feature_essentials");
const {readJsonFile} = require("../readJsonFile");
const {saveJsonFile} = require("../saveJsonFile");
const {isGroupAdmin} = require("./isGroupAdmin");

async function adminPollReset(client, message, polltitle) {
    if (await isGroupAdmin(client, message, message.author)) {
        var datetime = new Date();
        //  savefile(todaysdate+".json",getFile(pollfile));
        try {
            saveJsonFile("poll_logs.json", readJsonFile(pollfile))
        } catch (e) {
            console.log("poll file not eist  for backup")
        }

        let base = {
            title: polltitle,
            polldate: datetime.toISOString().slice(0, 10),
            candis: "null"
        }
        //l(base.toString());
        saveJsonFile(pollfile, base)

        client.reply(message.chatId, "*Poll Created Successfully*\n Title : " + polltitle + "\n use (\\add candidate-name) to add candidate", message.id);

        //voterresetter

        let data = {
            list: ["testentry"]
        }

        saveJsonFile(voterslistfile, data);
    } else {
        client.reply(message.chatId, "*Admin Only Command*", message.id)
    }

}

module.exports = {adminPollReset}

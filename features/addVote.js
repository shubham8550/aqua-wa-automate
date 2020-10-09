const {addVotedLog} = require("./addVotedLog");
const {saveJsonFile} = require("../saveJsonFile");
const {pollfile} = require("./init_feature_essentials");
const {readJsonFile} = require("../readJsonFile");

function addVote(client, message, num) {
    console.log(num)

    let data = readJsonFile(pollfile)

    let vts = data["candis"][num]["votes"];

    vts = vts + 1;

    delete data["candis"][num]["votes"];
    data["candis"][num]["votes"] = vts
    console.log(data)
    saveJsonFile(pollfile, data)
    let op;
    op = "*Voted successfully on " + data["candis"][num]["name"] + "*\n*Anime Guild of Maharashtra*\n*Title : " + data["title"] + "*\n";
    let ls = "";
    let arr = data["candis"];
    for (let i = 0; i < arr.length; i++) {
        let cd = arr[i];
        ls = ls + ((i + 1).toString()) + ")" + cd["name"] + " : [" + cd["votes"] + " Votes] \n";

    }

    op = op + ls;
    op = op + "\n For voting use command */vote candidate-number* \n Example */vote 2*";

    client.reply(message.chatId, op, message.id, true);
    addVotedLog(message);
}

module.exports = {addVote}

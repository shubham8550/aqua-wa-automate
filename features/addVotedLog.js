const {saveJsonFile} = require("../saveJsonFile");
const {voterslistfile} = require("./init_feature_essentials");
const {readJsonFile} = require("../readJsonFile");

function addVotedLog(message) {
    let data = readJsonFile(voterslistfile)
    data["list"].push(message.author)
    saveJsonFile(voterslistfile, data);
}

module.exports = {addVotedLog}

const {voterslistfile} = require("./init_feature_essentials");
const {readJsonFile} = require("../readJsonFile");

function isVoted(message) {
    let data = readJsonFile(voterslistfile)
    // console.log(data["list"])
    return data["list"].includes(message.author);
}

module.exports = {isVoted}

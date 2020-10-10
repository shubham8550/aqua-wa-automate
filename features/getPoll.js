const {pollfile} = require("./init_feature_essentials");
const {readJsonFile} = require("../readJsonFile");

function getPoll(client, message) {

    let data = readJsonFile(pollfile)
    //console.log(data)
    let op = "";
    if (data["candis"] == "null") {
        op = "*Anime Guild of Maharashtra*\n*Title : " + data["title"] + "*\n No candidates Added \n use (*\\add candidate-name*) to add candidate";
    } else {
        op = "*Anime Guild of Maharashtra*\n*Title : " + data["title"] + "*\n";
        let ls = "";
        let arr = data["candis"];
        for (let i = 0; i < arr.length; i++) {
            let cd = arr[i];
            ls = ls + (i + 1).toString() + ")" + cd["name"] + " : [" + cd["votes"] + " Votes] \n";

        }

        op = op + ls;
        op = op + "\n For voting use command */vote candidate-number* \n Example */vote 2*";

    }
    client.reply(message.chatId, op, message.id, true)

}

module.exports = {getPoll}

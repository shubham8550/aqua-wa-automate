const {readJsonFile} = require("../readJsonFile");
const {isGroupAdmin} = require("./isGroupAdmin");
const {pollfile} = require("./init_feature_essentials");
const {saveJsonFile} = require("../saveJsonFile");

async function addCandidate(client, message, candi) {
    if (await isGroupAdmin(client, message, message, message.author)) {
        //  console.log("admin logging")
    } else {

        client.reply(message.chatId, "Ask Admin to add " + candi, message.id, true);
        return;
    }
    let data = readJsonFile(pollfile)

    if (data["candis"] === "null") {
        //  let arra=[];
        let cd = {
            name: candi,
            votes: 0
        };
        // cd.put("name",candi);
        // cd.put("votes",0);
        // arra.push(cd);
        delete data["candis"];
        // data.put("candis",arra);
        data["candis"] = [cd,]

    } else {
        if (data["candis"].length >= 9) {
            client.reply(message.chatId, "*you cant add more than 9 candidates in poll*", message.id, true);
            return;
        }

        let cd = {
            name: candi,
            votes: 0
        };


        data["candis"].push(cd);

    }

    //l(base.toString());
    saveJsonFile(pollfile, data)
    client.reply(message.chatId, "Poll Candidate " + candi + " Added Successfully", message.id, true);
}

module.exports = {addCandidate}

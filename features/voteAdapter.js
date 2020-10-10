const {addVote} = require("./addVote");
const {pollfile} = require("./init_feature_essentials");
const {readJsonFile} = require("../readJsonFile");
const {isVoted} = require("./isVoted");

function voteAdapter(client, message){
    console.log("flag1")

    //voteAdapter
    if (isVoted(message)){
        client.reply(message.chatId,"*you already voted for this poll*",message.id,true);
        return;
    }
    //console.log("flag2")
    let data=readJsonFile(pollfile)

    if(data["candis"]==="null") {
        client.reply(message.chatId,"No candidates Added In Poll",message.id,true);
        return;
    }

    let arr=data["candis"]
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        if(message.body.includes((i+1).toString())){
            //console.log(i)
            addVote(client,message,i);
            return;
        }
    }
    console.log("here")
    client.reply(message.chatId,"Wrong Format",message.id,true);

}

module.exports = {voteAdapter}

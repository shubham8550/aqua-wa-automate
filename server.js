
const feature = require('./features.js');
const wa = require('@open-wa/wa-automate');
const request = require('request');
const fs = require('fs');
const jikan="http://192.168.0.108:8000/v3/";
wa.create().then(client => start(client));

// const launchConfig = {
//     useChrome: false,
//     autoRefresh:true,
//     cacheEnabled:false,
//     sessionId: 'hr'
// };
function start(client) {
    client.onMessage(message => {
        if(message.isGroupMsg ){
            if (message.body.startsWith("/anime")) {
            feature.animeSearch(client,message,message.body.slice(6))
            }else if (message.body.startsWith("/manga")) {
                feature.mangaSearch(client,message,message.body.slice(6))
            } else if (message.body.toLowerCase().startsWith("/art")){
                feature.redditContent(client,message,"awwnime");
            } else if (message.body.toLowerCase().startsWith("/meme")){
                feature.redditContent(client,message,"Animemes");
            } else if (message.body.toLowerCase().startsWith("/help")){
                feature.helpContent(client,message,);
            } else if (message.body.toLowerCase().startsWith("/rules")){
                //rulesContent(client,message,);
                // saveJsonFile("test.json",{name:"shubham"})
                // console.log(readJsonFile("test.json").name)

            }

        }



        // if (message.body === 'Hi') {
        //    // client.sendStickerfromUrl(message.from,"https://raw.githubusercontent.com/open-wa/wa-automate-nodejs/master/release.png")
        //
        //     client.sendImageAsSticker(message.from,)
        //     //client.sendText(message.from, '👋 Hello!');
        // }
    });
}



// client.getGroupInviteLink(message.chatId).then(value => {
//     console.log(value)
// }).catch(reason => {
//     console.log(reason)
// })

// client.inviteInfo("https://chat.whatsapp.com/LJYGah65GKtBChoIttot3W").then(value => {
//     console.log(value)
// })


// client.getGroupAdmins(message.chatId).then(value => {
//     console.log(value+message.author)
//     console.log(value.toString().includes(message.author))
// });


const feature = require('./features.js');
const wa = require('@open-wa/wa-automate');
const request = require('request');
const fs = require('fs');
const jikan="https://api.jikan.moe/v3/";
//const jikan="http://192.168.0.108:8000/v3/";
const launchConfig = {
    useChrome: true,
    autoRefresh:true,
    disableSpins: true,
    blockCrashlogs: true,
    headless: true,
   // cacheEnabled:false,
    executablePath: "/usr/bin/chromium-browser",
  //  customUserAgent:"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
  //   cacheEnabled: false,
  //   chromiumArgs: [
  //       '--no-sandbox',
  //       '--disable-setuid-sandbox'
//    ]
};
wa.create(launchConfig).then(client => start(client));


function start(client) {
    client.onMessage(message => {
        if(message.isGroupMsg ){
            if (message.body.startsWith("/anime")) {
            feature.animeSearch(client,message,message.body.slice(6))
            }else if (message.body.startsWith("/manga")) {
                feature.mangaSearch(client,message,message.body.slice(6))
            }else if (message.body.startsWith("/sauce")) {
                feature.souceAdapter(client,message)
            }else if (message.body.startsWith("/poll")) {
                feature.getpoll(client,message)
            } else if (message.body.startsWith("/vote")) {
                feature.voteadapter(client,message)
            } else if (message.body.startsWith("/resetpoll")) {
                 feature.adminpollreset(client,message,message.body.slice(10))
            } else if (message.body.startsWith("/add")) {
                 feature.addcandidate(client,message,message.body.slice(4))
            } else if (message.body.toLowerCase().startsWith("/art")){
                feature.redditContent(client,message,"awwnime");
            } else if (message.body.toLowerCase().startsWith("/meme")){
                feature.redditContent(client,message,"");
            } else if (message.body.toLowerCase().startsWith("/wall")){
                feature.redditContent(client,message,"Animewallpaper");
            } else if (message.body.toLowerCase().startsWith("/help")){
                feature.helpContent(client,message,);
            } else if (message.body.toLowerCase().startsWith("/sticker") || message.body.toLowerCase().startsWith("/stiker")){
                 feature.sticker(client,message,);
            }  else if (message.body.toLowerCase().includes("chat.whatsapp.com/")){
                client.reply(message.from,"*WARNING*\n Invite links not Allowed",message.id);
            } else if (message.body.toLowerCase().startsWith("/rules")){
                //rulesContent(client,message,);
                // saveJsonFile("test.json",{name:"shubham"})
                // console.log(readJsonFile("test.json").name)
                client.getChatById(message.chatId).then(value => {
                    const { desc } = value.groupMetadata
                    client.reply(message.from, '*' + message.chat.name + '*\n🌠️\n✨️ Description:\n ' + `${desc}`,message.id,true)
                })

               //client.sendStickerfromUrl(message.from,"https://svg2png1.glitch.me/?u="+message.sender.pushname+"&rank=12&level=307");
                //client.reply(message.chatId,message.sender.formattedName+" | "+message.sender.name+" | "+message.sender.shortName+" | "+message.sender.pushname,message.id);//Shubham Badgujar Jio | Shubham Badgujar Jio | Shubham | Magician Master
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

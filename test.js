// const nodeHtmlToImage = require('node-html-to-image')
//
// const wa = require('@open-wa/wa-automate');
// const request = require('request');
//
//
//
//
// client.toBase64(request(""))
const feature = require('./features.js');
const statFile="userStat.json";
//init
// var data={
//     users:{
//         user_id:{
//             totalmsgs:0,
//             repoted: 0,
//
//         }
//     }
// }
// feature.saveJsonFile("userStat.json",data)

var obj=feature.readJsonFile(statFile)

function getRank(sender){
    let msg= obj.users[sender].totalmsgs;
    //delete obj.users[sender];
    let rank=1;
    for (user in obj.users) {
        if(obj.users[user].totalmsgs>msg){
            rank=rank+1;

        }
    }
    return rank;
}

console.log("Rank is "+getRank("Shu2ham"))


//console.log(obj.users.hasOwnProperty("lol3"))

//obj.users["lol3"]={totalmsgs:320,repoted: 1, };
//feature.saveJsonFile(statFile,obj)






















// const fs = require('fs');
// nodeHtmlToImage({
//     output: './image.png',
//     html: '<html> <head> <style> body{ background-color: coral; color: white; font-family: \'Oswald\', sans-serif; }\n' +
//         '\n' +
//         '.container{ background-color: #D34E24; width: 100%; height: 750px; }\n' +
//         '\n' +
//         '.card{ position: relative; top: 20%; left: 30%; background-color: #D34E24; width: 500px; height: 380px; }\n' +
//         '\n' +
//         '.card_in{ position: absolute; top: 40px; background-color: #494A4E; width: 500px; height: 340px; border-radius: 50px; }\n' +
//         '\n' +
//         '.card_left{ background-color: #494A4E; width: 80%; height: 240px; border-top-left-radius: 50px; float: left; }\n' +
//         '\n' +
//         '.card_right{ position: relative; background-color: #494A4E; width: 20%; height: 240px; border-top-right-radius: 50px; float: right; }\n' +
//         '\n' +
//         '.chart{ position: absolute; background-color: black; width: 60%; height: 35px; left: 5px; border-radius: 10px; }\n' +
//         '\n' +
//         '.ch1{ top: 50px; }\n' +
//         '\n' +
//         '.ch2{ top: 100px; }\n' +
//         '\n' +
//         '.ch3{ top: 150px; }\n' +
//         '\n' +
//         '.fa{ position: absolute; top: 10px; left: 12px; }\n' +
//         '\n' +
//         '.card_below{ position: relative; overflow: hidden; background-color: #494A4E; width: 500px; height: 100px; border-radius: 0 0 50px 50px; }\n' +
//         '\n' +
//         '.card_below_left{ width: 80%; height: 100px; float: left; }\n' +
//         '\n' +
//         '.card_below_right{ width: 20%; height: 100px; float: right; }\n' +
//         '\n' +
//         '.title{ position: absolute; top: 5px; left: 35px; }\n' +
//         '\n' +
//         '.date-cat{ position: absolute; top: 35px; left: 35px; font-size: 10px; font-weight: 200; color: silver; }\n' +
//         '\n' +
//         'img { position: absolute; left: 24px; width: 70%; height: 280px; z-index: 1; border-radius: 30px; }\n' +
//         '\n' +
//         'a { text-decoration: none !important; }\n' +
//         '\n' +
//         '.handle:after { content: \'\\2807\'; font-size: 55px; color: #5a5f73; }</style> </head> <body> <div class="container"> <div class="card"> <img src="https://images.pexels.com/photos/1638883/pexels-photo-1638883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=290&w=150" alt="Peacebusters"> <div class="card_in"> <div class="card_left"> </div> <div class="card_right"> <div class="chart ch1"> <i class="fa fa-heart"> 78</i> </div> <div class="chart ch2"> <i class="fa fa-comment"> 03</i> </div> <div class="chart ch3"> <i class="fa fa-eye"> 33</i> </div> </div> <div class="card_below"> <div class="card_below_left"> <p class="title">Trying is a part of failing</p> <p class="date-cat">2020-08-13 | Category: Life</p> </div> <div class="card_below_right"> <a href="#"> <div class="handle"> </div> </a> </div> </div> </div> </div> </div> </body></html>'
// })
//     .then(() => console.log('The image was created successfully!'))
//

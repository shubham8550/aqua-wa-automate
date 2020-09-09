const request = require('request');
const fs = require('fs');
const dm = require('@open-wa/wa-decrypt');
const multer = require('multer');
const upload = multer();

const jikan="https://api.jikan.moe/v3/";
module.exports = { helpContent,souceAdapter,sticker,addcandidate,voteadapter ,helpContent,getpoll ,adminpollreset,animeSearch ,mangaSearch,redditContent,readJsonFile,saveJsonFile}
const pollfile="poll_Config.json";
const voterslistfile="poll_voters_Config.json";

function voteadapter(client,message){
    console.log("flag1")

    //voteadapter
    if (isvoted(message)){
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
            addvote(client,message,i);
            return;
        }
    }
    console.log("here")
   client.reply(message.chatId,"Wrong Format",message.id,true);

}
async function souceAdapter(client,message){
    let { type, body, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, chatId, Contact, author } = message
    if (quotedMsg && quotedMsg.type == 'image') {
        const mediaData = await dm.decryptMedia(quotedMsg)


        const url = 'https://trace.moe/api/search';


        var formData = {
            image: {
                value: mediaData, // Upload the first file in the multi-part post
                options: {
                    filename: 'image'
                }
            }
        };

        const options = {
            uri: url,
            formData: formData,
            method: 'POST'
        }

        request(options, (err, response, body) => {
            let daten;
            if (err) {
                console.log('Error!');
            } else {
                console.log('URL: ' + body);
                try {
                    daten = JSON.parse(body);
                } catch (error) {
                    // console.log("keine Sauce gefunden")
                    client.sendText(message.from, "Could not find source");
                    return
                }

                var anime = "Sauce Search Result:\n"
                for (let index = 1; index < daten.docs.length; index++) {

                    var anime = anime + index + ". result " + daten.docs[index].title_english + "\n"

                }
                console.log(anime)
                client.reply(message.from, anime, message.id, true);
            }
        })


        // form.append('image','<FILE_DATA>', {
        //     filename: 'myfile.txt',
        //     contentType: 'text/plain'
        // }, fs.createReadStream(mediaData));

    } else {
        client.sendText(from, 'You did not quote a picture, Baka! To Search For Sauce, reply/quote an image with "/sauce" as caption')
    }










}

async function addcandidate(client,message, candi){
    if(await isGroupAdmin(client,message,message,message.author)){
      //  console.log("admin logging")
    }else {

       client.reply(message.chatId,"Ask Admin to add "+candi,message.id,true);
        return;
    }
    let data = readJsonFile(pollfile)

    if(data["candis"]==="null"){
      //  let arra=[];
        let cd={
            name:candi,
            votes:0
        };
        // cd.put("name",candi);
        // cd.put("votes",0);
        // arra.push(cd);
        delete data["candis"];
        // data.put("candis",arra);
        data["candis"]=[cd,]

    }else {
        if(data["candis"].length >= 9){
           client.reply(message.chatId,"*you cant add more than 9 candidates in poll*",message.id,true);
            return;
        }

        let cd={
            name:candi,
            votes:0
        };


        data["candis"].push(cd);

    }




    //l(base.toString());
    saveJsonFile(pollfile,data)
    client.reply(message.chatId,"Poll Candidate "+candi+" Added Successfully",message.id,true);

}


function addvote(client,message,num) {
    console.log(num)

    let data = readJsonFile(pollfile)

    let vts=data["candis"][num]["votes"];

    vts=vts+1;

    delete data["candis"][num]["votes"];
    data["candis"][num]["votes"]=vts
    console.log(data)
    saveJsonFile(pollfile,data)
    let op;
    op="*Voted successfully on "+data["candis"][num]["name"]+"*\n*Anime Guild of Maharashtra*\n*Title : "+data["title"]+"*\n";
    let ls="";
    let arr=data["candis"];
    for (let i = 0; i < arr.length; i++) {
        let cd=arr[i];
        ls= ls+((i+1).toString())+")"+cd["name"]+" : ["+cd["votes"]+" Votes] \n";

    }

    op=op+ls;
    op=op+"\n For voting use command */vote candidate-number* \n Example */vote 2*";

    client.reply(message.chatId,op,message.id,true);
    addvotedlog(message);


}

function isvoted(message) {

    let data=readJsonFile(voterslistfile)
   // console.log(data["list"])
    return data["list"].includes(message.author);

}
function addvotedlog(message) {
    let data=readJsonFile(voterslistfile)
    data["list"].push(message.author)
    saveJsonFile(voterslistfile,data);
}



function getpoll(client,message){

    let data=readJsonFile(pollfile)
    //console.log(data)
    let op="";
    if(data["candis"]=="null"){
        op="*Anime Guild of Maharashtra*\n*Title : "+data["title"]+"*\n No candidates Added \n use (*\\add candidate-name*) to add candidate";
    }else {
        op="*Anime Guild of Maharashtra*\n*Title : "+data["title"]+"*\n";
        let ls="";
        let arr=data["candis"];
        for (let i = 0; i < arr.length; i++) {
            let cd=arr[i];
            ls= ls+(i+1).toString()+")"+cd["name"]+" : ["+cd["votes"]+" Votes] \n";

        }

        op=op+ls;
        op=op+"\n For voting use command */vote candidate-number* \n Example */vote 2*";

    }
    client.reply(message.chatId,op,message.id,true)

}
async function adminpollreset(client,message,polltitle) {
    if(await isGroupAdmin(client,message,message.author)){
        var datetime = new Date();
      //  savefile(todaysdate+".json",getFile(pollfile));
        try{
            saveJsonFile("poll_logs.json",readJsonFile(pollfile))
        }catch (e) {
            console.log("poll file not eist  for backup")
        }

        let base={
            title:polltitle,
            polldate:datetime.toISOString().slice(0,10),
            candis:"null"
        }
        //l(base.toString());
        saveJsonFile(pollfile,base)

        client.reply(message.chatId,"*Poll Created Successfully*\n Title : "+polltitle+"\n use (\\add candidate-name) to add candidate",message.id);

        //voterresetter

        let data={
            list:["testentry"]
        }

        saveJsonFile(voterslistfile,data);
    }else {
        client.reply(message.chatId,"*Admin Only Command*",message.id)
    }


}

async function sticker(client,message) {
    let { type, body, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, chatId, Contact, author } = message
    let args = body.trim().split(' ')
    let isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)
    if (isMedia) {
        const mediaData = await dm.decryptMedia(message)
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await client.sendImageAsSticker(from, imageBase64)
    } else if (quotedMsg && quotedMsg.type == 'image') {
        const mediaData = await dm.decryptMedia(quotedMsg)
        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
        await client.sendImageAsSticker(from, imageBase64)
    } else if (args.length == 2) {
        const url = args[1]

        url.match(isUrl) ? await client.sendStickerfromUrl(from, url, { method: 'get' })
            .then(r => { if (!r) client.sendText(from, 'The URL is not walid') })
            .catch(err => console.log('Caught exception: ', err)) : client.sendText(from, 'Sorry The URL is not valid')
    } else {
        client.sendText(from, 'You did not quote a picture, Baka! To make a sticker, send an image with "/sticker" as caption')
    }

}
function helpContent(client, message) {
    var helptext="*Anime Guild Of Maharastra*\n" +
        "\nUseless AQua B0T\n" +
        "*Commands & Usage*\n" +
        "  1) */art*\n" +
        "  2) */meme*\n" +
        "  3) */anime [anime-name]*\n" +
        "  4) */manga [manga-name]*\n" +
        "\n" +
        "Note :old commands will start work as soon as i finish porting them[Admin]"
    client.reply(message.chatId,helptext,message.id,true).catch(console.log)

}
function redditContent(client,message,rchannel){
    request({
        url: 'http://meme-api.herokuapp.com/gimme/'+rchannel,
        json: true
    }, function(error, response, body) {

        client.sendFileFromUrl(message.from,body.url,body.url.split('/').pop(),body.title,);

    });
}

function animeSearch(client,message,query) {
    request({
        url: jikan+'search/anime?q='+query+'&limit=1',
        json: true
    }, function(error, response, body) {
        console.log(body.results[0].title);
        //client.sendStickerfromUrl(message.from,body.results[0].image_url);
        let caption="*Anime Guild of Maharashtra*\n"+
            "Anime Search Result:-"+"\n\n"+
            "*Title : "+body.results[0].title+"*\n"+
            "Type : "+body.results[0].type+"\n"+
            "Score: *"+body.results[0].score+"*  Episodes: *"+body.results[0].episodes+"*\n"+
            "*Synopsis* : "+body.results[0].synopsis+"\n"+"\n"+body.results[0].url;


        client.sendFileFromUrl(message.from,body.results[0].image_url,body.results[0].image_url.split('/').pop(),caption);
    });
}
function mangaSearch(client,message,query) {
    request({
        url: jikan+'search/manga?q='+query+'&limit=1',
        json: true
    }, function(error, response, body) {
        console.log(body.results[0].title);
        //client.sendStickerfromUrl(message.from,body.results[0].image_url);
        let caption="*Anime Guild of Maharashtra*\n"+
            "Manga Search Result:-"+"\n\n"+
            "*Title : "+body.results[0].title+"*\n"+
            "Publishing : "+body.results[0].publishing+"\n"+
            "Score: *"+body.results[0].score+"*  Chapters: *"+body.results[0].chapters+"*\n"+
            "*Synopsis* : "+body.results[0].synopsis+"\n"+"\n"+body.results[0].url;


        client.sendFileFromUrl(message.from,body.results[0].image_url,body.results[0].image_url.split('/').pop(),caption);
    });
}

function rulesContent(client, message) {
    if(message.isGroupMsg){
        console.log("pokemon "+client.DESCRIPTION)
        client.glob
    }else {
        client.reply(message.from,"*This Command only Works Inside group's*")
    }
}





var configFiles=__dirname+"\\configFiles\\";
 function readJsonFile(filename) {
    filename=configFiles+filename;
    let rawdata = fs.readFileSync(filename);
    return JSON.parse(rawdata);

}
function saveJsonFile(filename,object) {
    filename=configFiles+filename;
   // console.log("pokelog "+filename)
    var jsonContent = JSON.stringify(object);
    fs.writeFile(filename, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File."+filename);
            return console.log(err);
        }


    });
}
async function isGroupAdmin(client,message,author) {
    let value=await client.getGroupAdmins(message.chatId)
    return value.toString().includes(message.author)
}


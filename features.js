const request = require('request');
const fs = require('fs');
const jikan="http://192.168.0.108:8000/v3/";
module.exports = { helpContent ,helpContent ,animeSearch ,mangaSearch,redditContent,readJsonFile,saveJsonFile}


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
    client.reply(message.from,helptext,message.id)

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
    console.log("pokelog "+filename)
    var jsonContent = JSON.stringify(object);
    fs.writeFile(filename, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File."+filename);
            return console.log(err);
        }


    });
}


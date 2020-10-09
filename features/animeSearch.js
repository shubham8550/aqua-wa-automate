const {jikan} = require("./init_feature_essentials");

function animeSearch(client, message, query) {
    request({
        url: jikan + 'search/anime?q=' + query + '&limit=1',
        json: true
    }, function (error, response, body) {
        console.log(body.results[0].title);
        //client.sendStickerfromUrl(message.from,body.results[0].image_url);
        let caption = "*Anime Guild of Maharashtra*\n" +
            "Anime Search Result:-" + "\n\n" +
            "*Title : " + body.results[0].title + "*\n" +
            "Type : " + body.results[0].type + "\n" +
            "Score: *" + body.results[0].score + "*  Episodes: *" + body.results[0].episodes + "*\n" +
            "*Synopsis* : " + body.results[0].synopsis + "\n" + "\n" + body.results[0].url;


        client.sendFileFromUrl(message.from, body.results[0].image_url, body.results[0].image_url.split('/').pop(), caption);
    });
}

module.exports = {animeSearch}

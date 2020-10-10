const {jikan} = require("./init_feature_essentials");

function mangaSearch(client, message, query) {
    request({
        url: jikan + 'search/manga?q=' + query + '&limit=1',
        json: true
    }, function (error, response, body) {
        console.log(body.results[0].title);
        //client.sendStickerfromUrl(message.from,body.results[0].image_url);
        let caption = "*Anime Guild of Maharashtra*\n" +
            "Manga Search Result:-" + "\n\n" +
            "*Title : " + body.results[0].title + "*\n" +
            "Publishing : " + body.results[0].publishing + "\n" +
            "Score: *" + body.results[0].score + "*  Chapters: *" + body.results[0].chapters + "*\n" +
            "*Synopsis* : " + body.results[0].synopsis + "\n" + "\n" + body.results[0].url;


        client.sendFileFromUrl(message.from, body.results[0].image_url, body.results[0].image_url.split('/').pop(), caption);
    });
}

module.exports = {mangaSearch}

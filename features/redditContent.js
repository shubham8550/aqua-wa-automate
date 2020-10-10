function redditContent(client, message, rchannel) {
    request({
        url: 'http://meme-api.herokuapp.com/gimme/' + rchannel,
        json: true
    }, function (error, response, body) {

        client.sendFileFromUrl(message.from, body.url, body.url.split('/').pop(), body.title,);

    });
}

module.exports = {redditContent}

async function sourceAdapter(client, message) {
    let {type, body, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, chatId, Contact, author} = message
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

module.exports = {sourceAdapter}

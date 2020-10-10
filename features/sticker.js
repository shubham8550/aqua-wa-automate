async function sticker(client, message) {
    let {type, body, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, chatId, Contact, author} = message
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

        url.match(isUrl) ? await client.sendStickerfromUrl(from, url, {method: 'get'})
            .then(r => {
                if (!r) client.sendText(from, 'The URL is not walid')
            })
            .catch(err => console.log('Caught exception: ', err)) : client.sendText(from, 'Sorry The URL is not valid')
    } else {
        client.sendText(from, 'You did not quote a picture, Baka! To make a sticker, send an image with "/sticker" as caption')
    }

}

module.exports = {sticker}

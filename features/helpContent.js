function helpContent(client, message) {
    var helptext = "*Anime Guild Of Maharastra*\n" +
        "\nUseless AQua B0T\n" +
        "*Commands & Usage*\n" +
        "  1) */art*\n" +
        "  2) */meme*\n" +
        "  3) */anime [anime-name]*\n" +
        "  4) */manga [manga-name]*\n" +
        "\n" +
        "Note :old commands will start work as soon as i finish porting them[Admin]"
    client.reply(message.chatId, helptext, message.id, true).catch(console.log)

}

module.exports = {helpContent}

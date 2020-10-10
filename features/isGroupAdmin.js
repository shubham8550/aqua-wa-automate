async function isGroupAdmin(client, message, author) {
    let value = await client.getGroupAdmins(message.chatId)
    return value.toString().includes(message.author)
}

module.exports = {isGroupAdmin}

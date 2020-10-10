var configFiles = __dirname + "\\configFiles\\";
const fs = require('fs');

function readJsonFile(filename) {
    filename = configFiles + filename;
    let rawdata = fs.readFileSync(filename);
    return JSON.parse(rawdata);

}

module.exports = {readJsonFile}

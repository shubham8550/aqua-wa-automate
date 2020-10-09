var configFiles = __dirname + "\\configFiles\\";
const fs = require('fs');

function saveJsonFile(filename, object) {
    filename = configFiles + filename;
    // console.log("pokelog "+filename)
    var jsonContent = JSON.stringify(object);
    fs.writeFile(filename, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File." + filename);
            return console.log(err);
        }


    });
}

module.exports = {saveJsonFile}

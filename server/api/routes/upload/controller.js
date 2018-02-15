
const fs = require("fs");
var uploadController = module.exports = {};

uploadController.fetchCombinedWords = function (req, res, next) {
  if (req.file) {
    var buffer = '';
    let lineStream = fs.createReadStream(req.file.path, { bufferSize: 128 * 4096 });
    lineStream.on('data', function (chunk) {
      var lines = (buffer + chunk).split(/\r?\n/g);
      //buffer = lines.pop();
      var combinedArr = [];
      var newLines = lines.map(word => {
        return word.toLowerCase();
      });
      for (let i = 0; i < newLines.length; i++) {
        var firstWord = newLines[i];
        for (let i = 0; i < newLines.length; i++) {
          let firstCombination = firstWord + newLines[i];
          let secondCombination = newLines[i] + firstWord;
          combinedArr.push(firstCombination, secondCombination);
        }
      }
      var response = newLines.filter(word => {
        return combinedArr.indexOf(word) > -1;
      });
      response = response.join(',');
      res.send(response);
    });
    lineStream.on('end', function () {
      // Don't know yet. We need this or not.
    });

  } else {
    res.json({ 'message': "Please upload a file" })
  }

}


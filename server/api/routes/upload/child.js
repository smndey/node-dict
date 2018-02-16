const fs = require("fs");
const LineByLineReader = require('line-by-line');

process.on('message', (path) => {
  var lineArr = [];
  var combinedArr = [];
  lr = new LineByLineReader(path);
  lr.on('error', (err) => {
    if (err) throw new Error(`Something wrong in file: ${err}`);
  });
  lr.on('line', (line) => {
    lineArr.push(line);
  });
  lr.on('end', () => {
    var newArr = lineArr.map(word => {
      return word.toLowerCase();
    });
    console.log(newArr.length);
    newArr.forEach(firstWord => {
      //combinedArr.push(firstWord);
      newArr.forEach(secondWord => {
        combinedArr.push(firstWord.concat(secondWord), secondWord.concat(firstWord))
      });
    });
    var response = newArr.filter(word => {
      return combinedArr.indexOf(word) > -1;
    });
    process.send(response);
  });
});

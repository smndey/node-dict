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
    var newArr = lineArr.map(word => word.toLowerCase());
    var loop = function (index, next) {
      if (index === newArr.length) {
        return;
      }
      for (let i = 0; count = newArr.length, i < count; i++) {
        if (newArr[index] !== newArr[i]) {
          if (newArr[i].startsWith(newArr[index])) {
            combinedArr.push(newArr[i]);
          }
        }
      }
      loop(index + 1);
    }
    loop(0);
    let response = newArr.filter(word => {
      return combinedArr.indexOf(word) > -1;
    });
    process.send(response);
  });
});

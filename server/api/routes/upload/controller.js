const cp = require('child_process');
var uploadController = module.exports = {};

uploadController.fetchCombinedWords = function (req, res, next) {
  if (req.file) {
    const childProcess = cp.fork(`${__dirname}/child.js`);
    childProcess.on('message', (childResponse) => {
      res.json({ data: childResponse });
    });
    childProcess.send(req.file.path);
  } else {
    res.json({ 'message': "Please upload a file" });
  }
}

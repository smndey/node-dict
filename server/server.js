const express = require("express");
const app = express();

app.use(require("./api/routes"));

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("App is running on port " + port);
});

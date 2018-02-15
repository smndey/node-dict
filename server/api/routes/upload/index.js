const express = require("express");
const uploadRouter = express.Router();
const multer = require("multer");
const controller = require("./controller");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

let upload = multer({ storage: storage });
uploadRouter
  .route("/")
  .post(upload.single("dict_file"), controller.fetchCombinedWords);

module.exports = uploadRouter;

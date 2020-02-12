const Express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const serveIndex = require("serve-index");
const internalIp = require('internal-ip');

const app = Express();

const port = 80;

app.use(Express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); //file.fieldname + "_" + Date.now() + "_" + file.originalname
  }
});

var upload = multer({
  storage: Storage
}).array("imgUploader", 3);

app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.use("/images", serveIndex(__dirname + "/images"));
app.use("/images", Express.static(__dirname + "\\images"));

app.post("/api/Upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end("Błąd: " + err);
    }
    return res.render("sent.ejs");
  });
});

app.listen(port, console.log(`address to connect to: ${internalIp.v4.sync()}:${port}`));
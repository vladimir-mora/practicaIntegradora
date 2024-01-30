const express = require("express");
const app = express();
const port = 8080;
const exphbs = require("express-handlebars");
const multer = require("multer");
const imgRouter = require("./routes/img.router.js");
require("../src/database.js");

// handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// midlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage }).single("image"));

// rutas
app.use("/", imgRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

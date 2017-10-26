//server packages
var express = require("express");
var bodyParser = require("body-parser");



//database managers
var mongoose = require("mongoose");

//scrapting tools
var cheerio = require("cheerio");

var db = require('./models')

//setting the default port
var port = 3000;
//Initializing Express
var app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

//initializing handelbars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var routes = require("./controllers/news_controllers.js");

app.use("/", routes);

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater", {
  useMongoClient: true
});







//starting the app
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
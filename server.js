//server packages
var express = require("express");
var bodyParser = require("body-parser");



//database managers
var mongoose = require("mongoose");

//scrapting tools
var cheerio = require("cheerio");
var axios = require("axios");

var db = require('./models')

//setting the default port
var PORT = process.env.PORT || 3000
//Initializing Express
var app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// //initializing handelbars
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


//var routes = require("./controllers/news_controllers.js");

//app.use("/", routes);

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

//route for scraping articles into the db
app.get("/scrape", function(req, res) {

  axios.get("https://www.reddit.com/r/TheOnion+nottheonion/").then(function(response) {

    var $ = cheerio.load(response.data);


    $("p.title").each(function(i, element) {

      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");


      db.Article
        .create(result)
        .then(function(dbArticle) {

          res.redirect('back')
        })
        .catch(function(err) {

          res.json(err);
        });
    });
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {

  db.Article
    .find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Route for getting one article
app.get("/articles/:id", function(req, res) {
  db.Article
    .findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  db.Note
    .create(req.body)
    .then(function(dbNote) {

      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});




// Route for grabbing a specific Article by id, populate it with it's notes
app.get("/articles/:id", function(req, res) {
  db.Article
    .findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});





// route for droping a database and starting fresh.  Mostly for testing purposes
app.get("/drop", function(req, res) {
    mongoose.connection.dropDatabase();
    res.redirect('back');
});



//starting the app
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
var express = require("express");

var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/teams", function(req, res) {
   res.render("teams.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});
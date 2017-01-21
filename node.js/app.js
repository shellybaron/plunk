var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/plunk");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//SCHEMA SETUP
var groupsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    location: String
});

var Group = mongoose.model("Group", groupsSchema);

// Group.create(
//     { 
//         name: "running", 
//         image: "https://fb-s-d-a.akamaihd.net/h-ak-xfp1/v/t31.0-8/15137662_1287807517938041_5436457653534003820_o.jpg?oh=0335286af3ff15f2151b90f4190f10f6&oe=58AEBDA4&__gda__=1487852079_a0f4016fb7adfafb02ece651aec4273b",
//         description: "running desc",
//         location: "running location"
        
//     }, function(err, group){
//         if (err) {
//             console.log(err);
//         } else {
//           console.log(group); 
//         }
//     });

app.get("/", function(req, res) {
    res.render("home");
});

//INDEX - SHOW ALL GROUPS
app.get("/groups", function(req, res) {
    Group.find({}, function(err, allGroups) {
        if (err) {
            console.log(err);
        } else {
             res.render("groups", {groups: allGroups}); 
        }
    });
});

//NEW - SHOW FORM TO CREATE A GROUP
app.get("/groups/new", function(req, res) {
    Group.find({}, function(err, allGroups) {
        if (err) {
            console.log(err);
        } else {
             res.render("newGroup"); 
        }
    });
});

//CREATE - CREATES A NEW GROUP AND SAVE IT TO DB
app.post("/groups", function(req, res) {
    var groupName = req.body.name;
    var groupImg = req.body.image;
    var groupDescription = req.body.description;
    
    var newGroup = {name:groupName, image:groupImg, description:groupDescription}
    
    Group.create(newGroup, function(err, group){
        if (err) {
            console.log(err);
        } else {
          console.log(group); 
        }
    });
    
    res.redirect("/groups");
});

//SHOW - SHOWS MORE INFO ABOUT A GIVEN GROUP
app.get("/groups/:id", function(req, res) {
    var id = req.params.id;
    Group.findById(id, function(err, foundGroup){
        if (err) {
            console.log(err);
        } else {
          res.render("showGroup", {group: foundGroup});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});
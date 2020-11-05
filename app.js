//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash'); //lodash  _.lowercase for converting any type of string to lower case


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];  // array of large poll of posts store all posts

app.get("/", function(req,res){

  res.render("home", { 
    Pagecontent:homeStartingContent,
    posts:posts
  });
});

app.get("/about", function(req,res){
res.render("about", {AboutPage:contactContent });
});

app.get("/contact", function(req,res){
  res.render("contact", {contactPage:aboutContent });
  
  });

  app.get("/compose", function(req,res){
    res.render("compose");
    
    });

    app.post("/compose", function(req, res){
     
      const post ={  // taking value form compose page form
         title : req.body.postTitle,
        content : req.body.postBody
      };

      posts.push(post);  // inserting values to post array at top which is globels
      res.redirect("/");  // redirect to home page after submiting form

    });

    app.get("/post/:postT", function(req,res){  // did this logic for dynamic url setting challenge 17
        let requested =_.lowerCase(req.params.postT);  // express routing params documents & challenge 16 & _.lowercase for converting any type of string to lower case

        posts.forEach(function(post){
         const postTitle =_.lowerCase(post.title);  // _.lowercase for converting any type of string to lower case

         if( requested === postTitle )
         {
          
               res.render("post", { PostTitle:post.title, PostBody:post.content });
          
         };

        });
       
    });
  


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

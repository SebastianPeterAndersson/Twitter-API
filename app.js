"use strict";

/*
    This is Sebastian Andersson's twitter app.
    This project is a part of the Fullstack JavaScript Developer course on
    http://www.teamtreehouse.com.

    Here I will be creating an app that let's me see what's going on my twitter profile.
    Modules used:
        -Express
        -Pug
        -Twit
*/


//–––––––| Constants |––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const express = require("express"),
    app = express(),
    construct = require("./modules/constructors.js"),
    config = require("./config.js"), //config.T to get twitter user configuration.
    //Storing functions that are needed for the program to work:
    functions = require("./functions/functions.js"),
    pug = require("pug"),
    Twit = require("twit"),
    T = new Twit(config),
    userID = "830341588123602945",
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    jsonParser = bodyParser.json();

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//–––––––| Testing Area |–––––––––––––––––––––––––––––––––––––––––––––––––––––––

var stream = T.stream('statuses/sample');

/*
stream.on('tweet', function (tweet) {
  console.log(tweet);
});
*/
//users/lookup

/*
let u = new Promise(function(resolve, reject) {
    T.get("account/settings", function(err, data, response) {
        resolve(data.screen_name);
    });
});

u.then(function(value) {
    T.get("users/show", {screen_name: value} , function(err, data, response) {
        console.log(data.id);
    });
});

*/




//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//–––––––| Settings |–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

app.set("views", __dirname + "/views");
app.set("view engine", "pug");


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//––––––| Middleware |––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.text({ type: 'text/html' }));

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

//––––––| Static |––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//––––––| Routes |––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// Firstly, I must generate the screen_name of the current user.

functions.getUserName(T).then(function(value) {
    console.log(value)
});

    // Push all the required information to an array so that we can chain promises:
    const promiseArr = [];

        // Get tweets:
        promiseArr.push(functions.getTweets(userID, T));
        // Get Friends
        promiseArr.push(functions.getFriends(userID, T));
        // Get messages
        promiseArr.push(functions.getMessages(userID, T));
        // Get info
        promiseArr.push(functions.getUserInfo(userID, T));

        // When all information is gathered:
        Promise.all(promiseArr).then(function(value) {
            // On tweet event:
            let tweets = [];
            for (var i = 0; value[0].length > i; i++) {
                let obj = value[0][i];
                let json = {};
                json.text = obj.text;
                json.retweets = obj.retweet_count;
                json.favourites = obj.user.favourites_count;
                json.date = obj.created_at;
                tweets.push(json);
            }


            let friends = [];
            for (var i = 0; value[1].length > i; i++) {
                let obj = value[1][i];
                let json = {}
                json.name = obj.name;
                json.screen_name = obj.screen_name;
                json.profile_image = obj.profile_image_url;
                friends.push(json);
            }

            let messages = [];
            for (var i = 0; value[2].length > i; i++) {
                let obj = value[2][i];
                let json = {};
                json.text = obj.text;
                json.date_time = obj.created_at;
                json.sender = obj.sender.name;
                json.sender_img = obj.sender.profile_image_url;
                messages.push(json);
            }

                let obj = value[3];
                let userInfo = {};
                userInfo.name = obj.name;
                userInfo.image = obj.profile_image_url;
                userInfo.screen_name = obj.screen_name;

            /*
            console.log(
            "Tweets: \n", tweets, "\n",
            "Friends: \n", friends, "\n",
            "Messages: \n", messages
            );
            */
            app.post("/test", urlencodedParser, function(req, res) {
                console.log("The tweet button was clicked!");

                /*
                T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
                    console.log(data)
                });
                */

            });

            /*
            var reader = dynamicallyGenerate();
            */

            // Main route
            app.get("/", function(req, res) {
                    let tweetName;
                    res.render("layout", {
                        title: "My Twitter App",
                        tweets: tweets,
                        messages: messages,
                        friends: friends,
                        userInfo: userInfo
                    });

            });

        });








    // Get

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//––––––| Listening |–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//––––––| Exports |–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

module.exports = app;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


// Tasks:

    //App

    // * Tweet <POST>
    // * Sign Out <GET>

    //Timeline

        // * Reply <POST>
        // * Retweet <POST>
        // * Favorite <POST>

    //Direct Messages

        // * Get Message <POST>
        // * Type <POST>
        // * Reply <POST>


// Prototypes:

    // * Following skeleton
        // $("li.circle-fluid")

    // * Tweet skeleton
        // $("ul.app--tweet--list li")

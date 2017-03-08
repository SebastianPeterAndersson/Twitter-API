"use strict";

/*
    This is Sebastian Andersson's twitter app.
    It is the seventh project of the Fullstack JavaScript Developer course on
    http://www.teamtreehouse.com

    Here I will be creating an app that let's me see what's going on my twitter profile.
    Modules used:
        - Express
        - Pug
        - Twit
        - Body Parsers

    Functionality:
        - Get 5 latest tweets
        - Get 5 latest friends (people followed)
        - Get 5 latest private messages
        - Post tweet

*/


//–––––––| Constants |––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const express = require("express"),
    app = express(),
    config = require("./config.js"), //config.T to get twitter user configuration.
    //Storing functions that are needed for the program to work:
    functions = require("./functions/functions.js"),
    pug = require("pug"),
    Twit = require("twit"),
    T = new Twit(config),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    jsonParser = bodyParser.json();

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//–––––––| Testing Area |–––––––––––––––––––––––––––––––––––––––––––––––––––––––

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

//Before anything can be done, the username is needed:
functions.getUserName(T).then(function(screen_name) {
    // Push all the required information to an array so that we can chain promises:
        const promiseArr = [];

        // Get tweets:
        promiseArr.push(functions.getTweets(screen_name, T));
        // Get Friends
        promiseArr.push(functions.getFriends(screen_name, T));
        // Get messages
        promiseArr.push(functions.getMessages(screen_name, T));
        // Get info
        promiseArr.push(functions.getUserInfo(screen_name, T));

        // When all information is gathered:
        Promise.all(promiseArr).then(function(value) {
            // The value above is an array with four arrays within it. Each containing one or more objects.
            let tweets = [];
            // Iterate over the first array and construct a json for each one.
            for (var i = 0; value[0].length > i; i++) {
                let obj = value[0][i];
                let json = {};
                json.text = obj.text;
                json.retweets = obj.retweet_count;
                json.favourites = obj.user.favourites_count;
                json.date = obj.created_at;
                // Push the tweets to the tweets array:
                tweets.push(json);
            }


            let friends = [];
            // Iterate over the second array and construct a json for each one.
            for (var i = 0; value[1].length > i; i++) {
                let obj = value[1][i];
                let json = {}
                json.name = obj.name;
                json.screen_name = obj.screen_name;
                json.profile_image = obj.profile_image_url;
                // Push the friends to the friends array:
                friends.push(json);
            }

            let messages = [];
            // Iterate over the third array and construct a json for each one.
            for (var i = 0; value[2].length > i; i++) {
                let obj = value[2][i];
                let json = {};
                json.text = obj.text;
                json.date_time = obj.created_at;
                json.sender = obj.sender.name;
                json.sender_img = obj.sender.profile_image_url;
                // Push the messages to the messages array:
                messages.push(json);
            }
                // The fourth array is only one object, which means no loop is necessary:
                let obj = value[3];
                let userInfo = {};
                userInfo.name = obj.name;
                userInfo.image = obj.profile_image_url;
                userInfo.screen_name = obj.screen_name;

            // When the tweet button is submitted, a post request is sent to this
            // location and whatever the tweet value is, is tweeted:
            app.post("/tweet", urlencodedParser, function(req, res) {
                console.log("The tweet button was clicked!", req.body.tweet);
                T.post('statuses/update', { status: req.body.tweet }, function(err, data, response) {
                    if (err) {
                        console.log(err);
                    }

                    if (data.text === undefined) {
                        console.log("Tweets with no content can't be posted!");
                    } else {
                        console.log("Tweet sent:", data.text, "\n At:", data.created_at)
                    }
                });
            });

            // Main route
            app.get("/", function(req, res) {
                    res.render("layout", {
                        title: "My Twitter App",
                        //Arrays :
                        tweets: tweets,
                        messages: messages,
                        friends: friends,
                        userInfo: userInfo
                    });
            });

        })
        .catch(function(err) {
            console.log(err);
        });

    })
    .catch(function(err) {
        console.log(err);
    });

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//––––––| Listening |–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


//––––––| Exports |–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

module.exports = app;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

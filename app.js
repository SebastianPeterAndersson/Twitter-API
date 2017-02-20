
var express = require("express"),
    app = express(),
    construct = require("./modules/constructors.js"),
    twitterUser = require("./config.js"), //config.T to get twitter user configuration.
    user = twitterUser.T,
    pug = require("pug");


app.use(express.static('public'))

app.set('view engine', 'pug');
app.set("views", "./views");

app.use((req, res, next) => {
    console.log("Hello");
    const err = new Error("Holy Smokes!");
    next(err);
});

app.use((req, res, next) => {
    console.log("World");
    next();
});

/*
console.log(pug.renderFile("./lol.pug", {
    name: "Sebastian"
}));
*/

app.get("/", function(req, res){
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});


app.listen(3000, function(){
    console.log("Server running on port 3000");
});

module.exports = app;

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

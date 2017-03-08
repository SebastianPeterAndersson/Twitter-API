
const exportThis = module.exports;


//Get users promise:
exportThis.getUserInfo = (function(screen_name, T) {
    return new Promise(function(resolve,reject) {
        T.get("users/show", {screen_name: screen_name}, (err, data, response) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
});

//Get tweets promise:
 exportThis.getTweets = (function (screen_name, T) {
    return new Promise(function(resolve, reject) {
        T.get("statuses/user_timeline", {screen_name: screen_name, count: 5}, (err, data, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
});

//Get friends promise:
exportThis.getFriends = (function(screen_name, T) {
    return new Promise(function(resolve, reject) {
        T.get("friends/list", {screen_name: screen_name, count: 5}, (err, data, response) => {
            if (err) {
                reject("Something went wrong with getting the friends", err);
            }
            resolve(data.users);
        });
    });
});


// Get messages promise:
exportThis.getMessages = (function(value, T) {
    return new Promise(function(resolve, reject) {
        T.get("direct_messages", {count: 5}, (err, data, response) => {
            if (err) {
                reject(err, "Something went wrong with getting the direct messages");
            }
            resolve(data);
        });
    });
});

//When the tweet button is clicked promise:
exportThis.onTweetClick = function(inputValue) {
    return new Promise(function(resolve, reject) {
        T.post('statuses/update', { status: inputValue }, function(err, data, response) {
            if (err) {
                reject("Something went wrong with posting the tweet", err);
            }
            console.log("tweet sent: ", data);
        });
    });
}

// Getting the username promise:
exportThis.getUserName = function(T){
    return new Promise(function(resolve, reject) {
        T.get("account/settings", function(err, data, response){
            if (err) {
                reject("Something went wrong with getting the username", err);
            }
            resolve(data.screen_name);
        });
    });
}

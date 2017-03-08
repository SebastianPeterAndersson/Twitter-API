

const exportThis = module.exports;

exportThis.getUserInfo = (function(userID, T) {
    return new Promise(function(resolve,reject) {
        T.get("users/show", {user_id: userID}, (err, data, response) => {
            if (err) {
                reject("Oh no!");
            }
            resolve(data);
        });
    });
});

 exportThis.getTweets = (function (userID, T) {
    return new Promise(function(resolve, reject) {
        T.get("statuses/user_timeline", {user_id: userID, count: 5}, (err, data, response) => {
            if (err) {
                reject (err);
            } else {
                resolve (data);
            }
        });
    });
});

exportThis.getFriends = (function(userID, T) {
    return new Promise(function(resolve, reject) {
        T.get("friends/list", {user_id: userID, count: 5}, (err, data, response) => {
            if (err) {
                reject(err);
            }
            resolve(data.users);
        });
    });
});

exportThis.getMessages = (function(value, T) {
    return new Promise(function(resolve, reject) {
        T.get("direct_messages", {count: 5}, (err, data, response) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
});

exportThis.onTweetClick = function(inputValue) {
    return new Promise(function(resolve, reject) {
        T.post('statuses/update', { status: inputValue }, function(err, data, response) {
            console.log(data);
        });
    });
}

exportThis.getUserName = function(T){
    return new Promise(function(resolve, reject) {
        T.get("account/settings", function(err, data, response){
            resolve(data.screen_name);
        });
    });
}






// Friends
// Profile image
// Real name
// Screen name

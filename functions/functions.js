

const exportThis = module.exports;

// *

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

// *

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

// *

exportThis.getFriends = (function(screen_name, T) {
    return new Promise(function(resolve, reject) {
        T.get("friends/list", {screen_name: screen_name, count: 5}, (err, data, response) => {
            if (err) {
                reject(err);
            }
            resolve(data.users);
        });
    });
});

// *

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
            if (err) {
                reject(err);
            }
            console.log(data);
        });
    });
}

exportThis.getUserName = function(T){
    return new Promise(function(resolve, reject) {
        T.get("account/settings", function(err, data, response){
            if (err) {
                reject(err);
            }
            resolve(data.screen_name);
        });
    });
}






// Friends
// Profile image
// Real name
// Screen name

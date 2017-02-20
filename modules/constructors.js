

var exports = module.exports;
// Constructs users that's following you:
exports.following = function Following(name, email, imgsrc) {
    var body = "";
    body += "<li>";
    body += "<div class='circle-fluid'>";
    body += "<div class='circle--fluid--cell circle--fluid--primary'>"
    body += "<a class='app--tweet--author'";
    body += "<div class='app--avatar' style='background-image:url(" + imgsrc + ")'>"
    body += "<img src='" + imgsrc + "'>";
    body += "</div>";
    body += "<h4>" + name + "</h4>";
    body += "<p>" + email + "</p>";
    body += "</a>";
    body += "</div>";
    body += "<div class='circle--fluid--cell'>";
    body += "<a class='button button-text'></a>";
    body += "</div>";
    body += "</div>";
    body += "</li>";
    return body;
}
// Constructs a tweet:
exports.tweets = function Tweet(time, imageurl, name, username, tweet, retweets, likes){
    var body = "";
    body += "<li>";
    body += "<strong class='app--tweet--timestamp'>" + time + "</strong>";
    body += "<a class='app--tweet--author'>";
    body += "<div class='app--avatar' style='background-image:url(" + imageurl + ")'>";
    body += "<img src='"+ imageurl +"'>";
    body += "</div>";
    body += "<h4>" + name + "</h4>";
    // Solve:
    body += username;
    body += "</a>";
    body += "<p>" + tweet + "</p>";
    body += "<ul class='app--tweet--actions circle--list--inline'>";

    body += "<li>";
    body += "<a class='app--reply'>";
    body += "<span class='tooltip'>Reply</span>";
    body += "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 38 28' xml:space='preserve'>";
    body += "<path d='M24.9,10.5h-8.2V2.8c0-1.1-0.7-2.2-1.7-2.6c-1-0.4-2.2-0.2-3,0.6L0.8,12c-1.1,1.1-1.1,2.9,0,4L12,27.2c0.5,0.5,1.2,0.8,2,0.8c0.4,0,0.7-0.1,1.1-0.2c1-0.4,1.7-1.5,1.7-2.6v-7.7h8.2c3.3,0,6,2.5,6,5.6v1.3c0,2,1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5v-1.3C38,16.2,32.1,10.5,24.9,10.5z'/>";
    body += "</svg>";
    body += "<strong>" + retweets + "</strong>";
    body += "</a>";
    body += "</li>";

    body += "<li>";
    body += "<a class='app--retweet'>";
    body += "<span class='tooltip'>Retweet</span>";
    body += "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 38 28' xml:space='preserve'>";
    body += "<path d='M24.9,10.5h-8.2V2.8c0-1.1-0.7-2.2-1.7-2.6c-1-0.4-2.2-0.2-3,0.6L0.8,12c-1.1,1.1-1.1,2.9,0,4L12,27.2c0.5,0.5,1.2,0.8,2,0.8c0.4,0,0.7-0.1,1.1-0.2c1-0.4,1.7-1.5,1.7-2.6v-7.7h8.2c3.3,0,6,2.5,6,5.6v1.3c0,2,1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5v-1.3C38,16.2,32.1,10.5,24.9,10.5z'/>";
    body += "</svg>";
    body += "</a>";
    body += "</li>";

    body += "<li>";
    body += "<a class='app--like'>";
    body += "<span class='tooltip'>Like</span>";
    body += "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 35 28' xml:space='preserve'>";
    body += "<path class='st0' d='M25.8,0c-3.6,0-6.8,2.1-8.3,5.1C16,2.1,12.9,0,9.2,0C4.1,0,0,4.1,0,9.2C0,21.4,17.3,28,17.3,28S35,21.3,35,9.2C35,4.1,30.9,0,25.8,0L25.8,0z'/>";
    body += "</svg>";
    body += "<strong>" + likes + "</strong>"
    body += "</a>";
    body += "</li>";

    return body;
}

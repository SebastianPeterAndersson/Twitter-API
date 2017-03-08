
$(document).ready(function(){
    $(".button-primary").click(function(e){
        e.preventDefault();
        console.log("Tweet button clicked");
        var postInfo = $("#tweet-textarea").val();
        $.post("/test", {tweet: postInfo}, function(data){
            console.log("Data: ", data, "sent");
        });
        $("#tweet-textarea").val("");
    });
})

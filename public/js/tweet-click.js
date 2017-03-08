
$(document).ready(function(){
    // On button click:
    $(".button-primary").click(function(e){
        // Prevent the default action of the button:
        e.preventDefault();
        console.log("Tweet button clicked");
        // The value the user has typed in to the textarea:
        var postInfo = $("#tweet-textarea").val();
        // Post the value to the tweet route:
        $.post("/tweet", {tweet: postInfo}, function(data){
            console.log("Data: ", data, "sent");
        });
        // Remove the text from the textarea for user experience purposes:
        $("#tweet-textarea").val("");
    });
})

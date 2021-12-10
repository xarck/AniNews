const { fetch } = require("./controllers/twitter");
const { submitPost } = require("./controllers/reddit");
require("dotenv").config();

async function postOnReddit() {
    var tweets = await fetch();
    tweets.forEach((tweet) => {
        submitPost(tweet.title, tweet.url);
    });
}

setInterval(postOnReddit, 900000);

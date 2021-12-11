const { fetch } = require("./controllers/twitter");
const { submitPost, getToken } = require("./controllers/reddit");
require("dotenv").config();

async function postOnReddit() {
    var tweets = await fetch();
    var token = await getToken();
    tweets.forEach((tweet) => {
        submitPost(token, tweet.title, tweet.url);
    });
}

postOnReddit();

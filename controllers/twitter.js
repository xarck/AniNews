const axios = require("axios");
const Tweet = require("../models/tweet.js");
const tweets = [];

var headers = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
};
async function fetch() {
    try {
        var animeNewsNet = await axios.get(
            "https://api.twitter.com/2/users/24383563/tweets",
            { headers }
        );
        var mangaMogura = await await axios.get(
            "https://api.twitter.com/2/users/1340979091202322432/tweets",
            { headers }
        );
        var animeTV = await await axios.get(
            "https://api.twitter.com/2/users/748185667860111360/tweets",
            { headers }
        );
        animeNewsNet.data.data.forEach((tweet) => {
            tweets.push(new Tweet(tweet.id, tweet.text));
        });
        mangaMogura.data.data.forEach((tweet) => {
            tweets.push(new Tweet(tweet.id, tweet.text));
        });
        animeTV.data.data.forEach((tweet) => {
            tweets.push(new Tweet(tweet.id, tweet.text));
        });
        return tweets;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { fetch };

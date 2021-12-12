const axios = require("axios");
const Tweet = require("../models/tweet.js");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
require("dotenv").config();
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
            "https://api.twitter.com/2/users/36178012/tweets?max_results=5",
            { headers }
        );

        var mangaMogura = await axios.get(
            "https://api.twitter.com/2/users/1340979091202322432/tweets?max_results=5",
            { headers }
        );

        var animeTV = await axios.get(
            "https://api.twitter.com/2/users/748185667860111360/tweets",
            { headers }
        );
        var animeNewsNetID = myCache.get("animeNetworkID");
        var animeTVID = myCache.get("animeTVID");
        var mangaMoguraID = myCache.get("mangaMoguraID");

        animeNewsNet.data.data.forEach((tweet) => {
            if (tweet.id > animeNewsNetID) {
                tweets.push(
                    new Tweet(
                        tweet.id,
                        tweet.text,
                        `https://twitter.com/Anime/status/${tweet.id}`
                    )
                );
            }
        });

        mangaMogura.data.data.forEach((tweet) => {
            if (tweet.id > mangaMoguraID) {
                tweets.push(
                    new Tweet(
                        tweet.id,
                        tweet.text,
                        `https://twitter.com/MangaMoguraRE/status/${tweet.id}`
                    )
                );
            }
        });
        animeTV.data.data.forEach((tweet) => {
            if (tweet.id > animeTVID) {
                tweets.push(
                    new Tweet(
                        tweet.id,
                        tweet.text,
                        `https://twitter.com/animetv_jp/status/${tweet.id}`
                    )
                );
            }
        });
        myCache.mset([
            { key: "animeNetworkID", val: animeNewsNet.data.data[0].id },
            { key: "mangaMoguraID", val: mangaMogura.data.data[0].id },
            { key: "animeTVID", val: animeTV.data.data[0].id },
        ]);
        return tweets;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { fetch };

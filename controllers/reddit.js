const axios = require("axios");
const { fetch } = require("./twitter");

require("dotenv").config();

async function getToken() {
    var base_url = "https://www.reddit.com/";
    var data = {
        grant_type: "password",
        username: "aninewsbot",
        password: process.env.REDDIT_PASSWORD,
    };
    var urls = base_url + "/api/v1/access_token";
    return await axios
        .post(urls, data, {
            auth: {
                username: process.env.REDDIT_CLIENT_ID,
                password: process.env.REDDIT_CLIENT_SECRET,
            },
            params: {
                grant_type: "password",
                username: "aninewsbot",
                password: process.env.REDDIT_PASSWORD,
            },
        })
        .then((res) => res.data.access_token)
        .catch((err) => console.log(err.message));
}

async function submitPost(token, title, url) {
    var params = {
        sr: process.env.SUB_NAME,
        title,
        url,
    };

    var token = `bearer ${token}`;

    var headers = {
        Authorization: token,
        "User-Agent": "aninewsnet by aninewsbot",
    };
    axios
        .post(
            "https://oauth.reddit.com/api/submit",
            {},
            {
                params: params,
                headers: headers,
            }
        )
        .then((res) => console.log(res.data.success))
        .catch((err) => console.log(err));
}

async function postOnReddit() {
    var tweets = await fetch();
    var token = await getToken();
    if (tweets.length > 0) {
        tweets.forEach((tweet) => {
            submitPost(token, tweet.title, tweet.url);
        });
    }
}
module.exports = { postOnReddit };

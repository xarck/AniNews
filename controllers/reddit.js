const axios = require("axios");
require("dotenv").config();

async function getToken() {
    var base_url = "https://www.reddit.com/";
    var data = {
        grant_type: "password",
        username: "aninewsbot",
        password: process.env.REDDIT_PASSWORD,
    };
    var urls = base_url + "api/v1/access_token";
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
        .then((res) => res.data.access_token);
}

async function submitPost(title, url) {
    var params = {
        sr: "aninewsnet",
        title,
        url,
    };
    var tok = await getToken();

    var token = `bearer ${tok}`;
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
        .then((res) => res.data)
        .catch((err) => console.log(err));
}

module.exports = { submitPost };

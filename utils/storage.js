const fs = require("fs");

function store(lastFetchID) {
    var json = JSON.stringify(lastFetchID);
    fs.writeFileSync("history.json", json, "utf8");
}

function read() {
    var obj;
    var exists = fs.existsSync("history.json");

    if (!exists) {
        obj = {
            animeNetworkID: "0",
            mangaMoguraID: "0",
            animeTVID: "0",
        };
    } else {
        try {
            var data = fs.readFileSync("history.json", "utf8");
            obj = JSON.parse(data);
        } catch (err) {
            console.log(err);
        }
    }
    return obj;
}

module.exports = { store, read };

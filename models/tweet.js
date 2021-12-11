class Tweet {
    constructor(id, title, url) {
        this.id = id;
        this.title = title.slice(0, title.indexOf("https"));
        this.url = url;
    }
}

module.exports = Tweet;

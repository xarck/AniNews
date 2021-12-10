class Tweet {
    constructor(id, title) {
        this.id = id;
        this.title = title.slice(0, title.indexOf("https"));
        this.url = title.slice(title.indexOf("https"), title.length - 1);
    }
}

module.exports = Tweet;

var app;
(function (app) {
    var domain;
    (function (domain) {
        var FeedItem = (function () {
            function FeedItem(link, title, description, uid) {
                this.link = link;
                this.title = title;
                this.description = description;
                this.uid = uid;
            }
            return FeedItem;
        })();
        domain.FeedItem = FeedItem;
        var Feed = (function () {
            function Feed(feedId, name, feedUrl, feedItems) {
                this.feedId = feedId;
                this.name = name;
                this.feedUrl = feedUrl;
                this.feedItems = feedItems;
            }
            return Feed;
        })();
        domain.Feed = Feed;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));

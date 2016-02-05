var app;
(function (app) {
    var feedView;
    (function (feedView) {
        var FeedViewCtrl = (function () {
            function FeedViewCtrl(dataAccessService, $location, $sce) {
                this.dataAccessService = dataAccessService;
                this.$location = $location;
                this.$sce = $sce;
                this.feeds = [];
                this.feedItems = [];
                this.feedName = this.feedUrl = "";
                this.initializeFeedList();
            }
            FeedViewCtrl.prototype.initializeFeedList = function () {
                var resource = this.dataAccessService.getFeedResource();
                this.feeds = [];
                var _me = this;
                resource.get(function (data) {
                    angular.forEach(data, function (item) {
                        var tempFeedItems = [];
                        var tempFeed = new app.domain.Feed(item.FeedId, item.Name, item.FeedUrl, tempFeedItems);
                        _me.feeds.push(tempFeed);
                    });
                });
            };
            FeedViewCtrl.prototype.getFeedItems = function (feedName, index) {
                var resource = this.dataAccessService.getFeedResource();
                var _me = this;
                resource.query({ feedName: feedName }, function (data) {
                    angular.forEach(data.FeedItems, function (item) {
                        var feedItem = new app.domain.FeedItem(item.Link, item.Title, item.Description, item.Uid);
                        _me.feedItems.push(feedItem);
                    });
                });
            };
            FeedViewCtrl.prototype.sanitizeDescription = function (description) {
                return this.$sce.trustAsHtml(description);
            };
            FeedViewCtrl.prototype.addFeed = function () {
                var resource = this.dataAccessService.getFeedResource();
                var _me = this;
                var tempFeed = new app.domain.Feed("", this.feedName, this.feedUrl, []);
                resource.save(tempFeed, function (data) {
                    _me.$location.path('/');
                });
            };
            FeedViewCtrl.$inject = ["dataAccessService", "$location", "$sce"];
            return FeedViewCtrl;
        })();
        feedView.FeedViewCtrl = FeedViewCtrl;
        angular.module("feedManagement").controller("FeedViewCtrl", FeedViewCtrl);
    })(feedView = app.feedView || (app.feedView = {}));
})(app || (app = {}));

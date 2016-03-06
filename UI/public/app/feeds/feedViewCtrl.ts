module app.feedView {
    
    export interface IFeedViewCtrl {
        feeds : app.domain.IFeed[];
        getFeedItems(feedName : string, index : number) : void;
        feedItems : app.domain.IFeedItem[];
        sanitizeDescription(description : string) : any;
        addFeed() : void;
        deleteFeed(feedName : string, index : number) : void;
        feedName : string;
        feedUrl : string;
    }
    
    export class FeedViewCtrl implements IFeedViewCtrl {
        feeds : app.domain.IFeed[];
        feedItems : app.domain.IFeedItem[];
        feedName : string;
        feedUrl : string;
        
        static $inject=["dataAccessService", "$location", "$sce"];
		constructor(private dataAccessService : app.common.DataAccessService,
			private $location : angular.ILocationService,
            private $sce : angular.ISCEService) {
			this.feeds = [];
            this.feedItems = [];
            this.feedName = this.feedUrl = "";
            
            this.initializeFeedList();
		}
        
        initializeFeedList() : void {
            var resource = this.dataAccessService.getFeedResource();
			this.feeds = [];
			let _me = this;
            resource.get((data) => {
                angular.forEach(data, function(item) {
                    let tempFeedItems : app.domain.IFeedItem[] = []; 
                    let tempFeed = new app.domain.Feed(item.FeedId, item.Name, item.FeedUrl, tempFeedItems);
					_me.feeds.push(tempFeed);
                });
            });
        }
        
        getFeedItems(feedName : string) {
            var resource = this.dataAccessService.getFeedResource();
            let _me = this;
            resource.query({feedName : feedName}, (data) => {
                angular.forEach(data, function(item){
                    let feedItem = new app.domain.FeedItem(item.Link, item.Title, item.Description, item.Uid);
                    _me.feedItems.push(feedItem);
                });
            });
        }
        
        sanitizeDescription(description : string) {
            return this.$sce.trustAsHtml(description);
        }
        
        addFeed() {
            var resource = this.dataAccessService.getFeedResource();
            let _me = this;
            let tempFeed = new app.domain.Feed("", this.feedName, this.feedUrl, []);
            resource.save(tempFeed, (data) => {
                _me.$location.path('/');
            });
        }
        
        deleteFeed(feedName : string, index : number) {
            var resource = this.dataAccessService.getFeedResource();
            let _me = this;
            resource.delete({feedName : feedName}, () => {
                let remainingFeeds = _me.feeds.filter(x => x.name !== feedName);
                _me.feeds = remainingFeeds;
            }, () => {
                console.log("some error occured");
            });
        }
    }
    
    angular.module("feedManagement").controller("FeedViewCtrl", FeedViewCtrl);
}
module app.feedView {
    
    export interface IFeedViewCtrl {
        feeds : app.domain.IFeed[];
        getFeedItems(feedName : string, index : number) : void;
        feedItems : app.domain.IFeedItem[];
        sanitizeDescription(description : string) : any;
        sayHello(feedName : string, feedUrl : string) : void;
    }
    
    export class FeedViewCtrl implements IFeedViewCtrl {
        feeds : app.domain.IFeed[];
        feedItems : app.domain.IFeedItem[];
        
        static $inject=["dataAccessService", "$location", "$sce"];
		constructor(private dataAccessService : app.common.DataAccessService,
			private $location : angular.ILocationService,
            private $sce : angular.ISCEService) {
			this.feeds = [];
            this.feedItems = [];
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
        
        getFeedItems(feedName : string, index : number) {
            var resource = this.dataAccessService.getFeedResource();
            let _me = this;
            resource.query({feedName : feedName}, (data) => {
                angular.forEach(data.FeedItems, function(item){
                    let feedItem = new app.domain.FeedItem(item.Link, item.Title, item.Description, item.Uid);
                    _me.feedItems.push(feedItem);
                });
            });
        }
        
        sanitizeDescription(description : string) {
            return this.$sce.trustAsHtml(description);
        }
        
        sayHello(feedName : string, feedUrl : string) {
            console.log("hello");
            console.log(feedName);
            console.log(feedUrl);
        }
    }
    
    angular.module("feedManagement").controller("FeedViewCtrl", FeedViewCtrl);
}
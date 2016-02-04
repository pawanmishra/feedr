module app.domain {
	export interface IFeedItem {
		link : string;
		title : string;
		description : string;
        uid : string;
	}
	
	export class FeedItem implements IFeedItem {
		constructor(public link: string,
					public title : string,
					public description : string,
                    public uid : string) {
				}
	}
	
	export interface IFeed {
		feedId : string;
		name : string;
        feedUrl : string,
		feedItems : IFeedItem[];
	}
	
	export class Feed implements IFeed {
		constructor(public feedId : string,
                    public name : string,
					public feedUrl : string,
					public feedItems : app.domain.IFeedItem[]) {
		}
	}
}
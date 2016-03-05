module app.common {
	interface IDataAccessService {
		getFeedResource() : angular.resource.IResourceClass<IFeedResource>;
	}
	
	interface IFeedResource extends angular.resource.IResource<app.domain.IFeed> {
	}
	
	interface IFeedResourceClass extends angular.resource.IResourceClass<IFeedResource> {
		update(params: Object, data: Object, success?: Function, error?: Function) : void;
	}
	
	export class DataAccessService 
		implements IDataAccessService {
		
		static $inject = ["$resource"];
		constructor(private $resource: angular.resource.IResourceService) {
			
		}
		
		//: ng.resource.IResourceClass<ITeamResource>
		getFeedResource() {
			return <IFeedResourceClass> this.$resource("http://localhost:3000/feeds/:feedName", {}, 
                {
				/*transformResponse: function(data, headers) {
                    return angular.fromJson(data);
                },*/
				post: {method:'POST'},
                save: {method:'POST'},
                get : {method: 'GET', isArray: true},
				query: {method: 'GET', isArray: true },
				update: {method: 'PUT', isArray: false},
				'delete': {method:'DELETE', params: { feedName:"@feedName" }}
			});
		}
	}
	angular.module("common.services").service("dataAccessService", DataAccessService);
}
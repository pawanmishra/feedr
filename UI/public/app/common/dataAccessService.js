var app;
(function (app) {
    var common;
    (function (common) {
        var DataAccessService = (function () {
            function DataAccessService($resource) {
                this.$resource = $resource;
            }
            //: ng.resource.IResourceClass<ITeamResource>
            DataAccessService.prototype.getFeedResource = function () {
                return this.$resource("http://localhost:3000/feeds/:feedName", {}, {
                    /*transformResponse: function(data, headers) {
                        return angular.fromJson(data);
                    },*/
                    post: { method: 'POST' },
                    save: { method: 'POST' },
                    get: { method: 'GET', isArray: true },
                    query: { method: 'GET', isArray: false },
                    update: { method: 'PUT', isArray: false },
                    'delete': { method: 'DELETE', params: { feedName: "@feedName" } }
                });
            };
            DataAccessService.$inject = ["$resource"];
            return DataAccessService;
        })();
        common.DataAccessService = DataAccessService;
        angular.module("common.services").service("dataAccessService", DataAccessService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));

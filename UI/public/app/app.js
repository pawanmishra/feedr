var app;
(function (app) {
    angular.module("feedManagement", ["common.services", "ngRoute", "ngSanitize", "ui.bootstrap"]).config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/feeds', {
                templateUrl: '/app/feeds/feedView.html'
            });
            $routeProvider.otherwise({
                redirectTo: '/feeds'
            });
        }]);
})(app || (app = {}));

angular.module('neows').config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('asteroids', {
            url: "/asteroids",
            templateUrl: "asteroids/asteroids.html"
        }).state('fastest', {
            url: "/asteroids/fastest",
            templateUrl: "asteroids/fastest.html"
        }).state('alerts', {
            url: "/alerts",
            templateUrl: "alerts/alerts.html"
        })

        $urlRouterProvider.otherwise('/asteroids')
    }
])
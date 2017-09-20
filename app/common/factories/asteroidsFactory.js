(function () {
    angular.module('neows').factory('asteroidService', [
        '$http',
        'consts',
        AsteroidService
    ])

    function AsteroidService($http, consts) {
        function getAsteroidList(startDate, endDate) {
            return $http.get(`${consts.apiURL}/feed?start_date=${startDate}&end_date=${endDate}&detailed=false&api_key=${consts.apiKEY}`)
        }

        function getAsteroidAlerts(asteroid) {
            return $http.get('alerts.json')            
        }

        return {
            getAsteroidList: getAsteroidList,
            getAsteroidAlerts: getAsteroidAlerts            
        };
    }

})()
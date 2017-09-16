(function () {
    angular.module('neows').controller('asteroidController', [
        '$http',
        '$location',
        AsteroidController
    ])

    function AsteroidController($http, $location) {
        const vm = this
        const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-09-16&end_date=2017-09-16&detailed=false&api_key=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD'

        vm.getAsteroid = function () {
            $http.get(url).then(function (response) {
                vm.asteroid = []
                vm.asteroids = response.data                
            })
        }

        vm.getAsteroid()
    }

})()
(function () {
    angular.module('neows').controller('fastestController', [
        '$http',
        'moment',
        'asteroidService',
        FastestController
    ]);

    function FastestController($http, moment, asteroidService) {
        var vm = this
        const momentDate = Date.now()

        vm.asteroid = []
        vm.asteroids = []
        vm.close_approach_data = []
        vm.endDate = moment(momentDate).format("YYYY-MM-DD")
        vm.endSetDate = moment(momentDate).toDate();
        vm.startDate = moment(vm.endDate).subtract(5, "days").format("YYYY-MM-DD")
        vm.startSetDate = moment(vm.endDate).subtract(5, "days").toDate()

        vm.getAsteroidsFastest = function (startDate, endDate) {
            asteroidService.getAsteroidList(startDate, endDate)
                .then((res) => vm.listAsteroidsFastest(res.data))
        }

        vm.listAsteroidsFastest = function (data) {
            vm.asteroids = data            
            
            vm.asteroid = Object.keys(vm.asteroids.near_earth_objects)
                .map(key => {
                    return {
                        date: key,
                        near_earth_object: vm.asteroids.near_earth_objects[key]
                    }
                })
            console.log(vm.asteroid)
        }

        vm.getAsteroidsFastest(vm.startDate, vm.endDate)
    }
})()
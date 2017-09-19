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
        vm.endDate = moment(momentDate).format("YYYY-MM-DD")
        vm.startDate = moment(vm.endDate).subtract(6, "days").format("YYYY-MM-DD")

        vm.getAsteroidsFastest = function (startDate, endDate) {
            asteroidService.getAsteroidList(startDate, endDate)
                .then((res) => vm.listAsteroidsFastest(res.data))
        }

        vm.listAsteroidsFastest = function (data) {
            vm.asteroids = data

            vm.asteroid = Object.keys(vm.asteroids.near_earth_objects)
                .sort(vm.asteroid.velocity)
                .map(key => {
                    return {
                        date: key,
                        near_earth_object: vm.asteroids.near_earth_objects[key],
                        velocity: vm.asteroids.near_earth_objects[key]
                            .map(key => {
                                return {
                                    id: key.neo_reference_id,
                                    name: key.name,
                                    date: key.close_approach_data[0].close_approach_date,
                                    kmh: parseInt(key.close_approach_data[0].relative_velocity.kilometers_per_hour)
                                }
                            })
                    }
                })
            
            console.log(vm.asteroid)
        }

        vm.getAsteroidsFastest(vm.startDate, vm.endDate)
    }
})()
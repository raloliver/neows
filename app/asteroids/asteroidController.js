(function () {
    angular.module('neows').controller('asteroidController', [
        '$http',
        'tabs',
        'moment',
        'asteroidService',
        AsteroidController
    ])

    function AsteroidController($http, tabs, moment, asteroidService) {
        const vm = this
        const momentDate = Date.now()

        //properties
        vm.activeDateTab = null
        vm.asteroid = []
        vm.asteroids = {}
        vm.endDate = moment(momentDate).format("YYYY-MM-DD")
        vm.endSetDate = moment(momentDate).toDate();
        vm.startDate = moment(vm.endDate).subtract(5, "days").format("YYYY-MM-DD")
        vm.startSetDate = moment(vm.endDate).subtract(5, "days").toDate();

        //functions
        vm.getAsteroids = function (startDate, endDate) {
            asteroidService.getAsteroidList(startDate, endDate)
                .then((res) => vm.updateAsteroids(res.data))            
        }

        vm.updateAsteroids = function (data) {
            vm.asteroids = data

            vm.asteroid = Object.keys(vm.asteroids.near_earth_objects)
                .map(key => {
                    return {
                        date: key,
                        near_earth_object: vm.asteroids.near_earth_objects[key]
                    }
                })                            
        }

        //methods
        vm.formatDate = function (format) {
            const [year, month, day] = format.split('-');
            const date = new Date(year, month - 1, day);

            return date;
        }

        //init
        vm.getAsteroids(vm.startDate, vm.endDate)
    }

})()
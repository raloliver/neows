(function () {
    angular.module('neows').controller('alertsController', [
        '$http',
        'asteroidService',
        AlertsController
    ]);

    function AlertsController($http, asteroidService) {
        var vm = this

        //properties
        vm.asteroid = {}
        vm.asteroids = []

        //functions
        vm.getAsteroidsAlerts = function () {
            asteroidService.getAsteroidAlerts()
                .then((res) => vm.listAsteroidsAlerts(res.data))
        }

        vm.listAsteroidsAlerts = function (data) {
            vm.asteroids = data
        }

        //methods
        vm.create = function () {
            vm.asteroids.splice(0, 0, vm.asteroid)
            vm.asteroid = ''
        }

        vm.edit = function (asteroid) {
            vm.asteroid = vm.asteroids[asteroid];           
            vm.editable = true
        }

        vm.update = function(){
            vm.asteroid = {}
            vm.editable = false            
        };

        vm.delete = function (asteroid) {
            vm.asteroids.splice(asteroid, 1)
        }

        //init
        vm.getAsteroidsAlerts()
    }
})()
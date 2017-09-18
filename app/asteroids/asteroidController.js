(function () {
    angular.module('neows').controller('asteroidController', [
        '$http',
        '$rootScope',
        'tabs',
        'moment',
        'asteroidService',
        AsteroidController
    ])

    function AsteroidController($http, $rootScope, tabs, moment, asteroidService) {
        const vm = this
        const momentDate = Date.now()

        //properties
        vm.activeDateTab = null
        vm.asteroid = []
        vm.asteroids = {}
        vm.endDate = moment(momentDate).format("YYYY-MM-DD")
        vm.endSetDate = moment(momentDate).toDate();
        vm.startDate = moment(vm.endDate).subtract(5, "days").format("YYYY-MM-DD")
        vm.startSetDate = moment(vm.endDate).subtract(5, "days").toDate()

        //functions
        vm.getAsteroids = function (startDate, endDate) {
            asteroidService.getAsteroidList(startDate, endDate)
                .then((res) => vm.updateAsteroids(res.data))
        }

        vm.sendChangeDate = function (is) {
            vm.firstChange = is

            vm.startSetDate = moment(vm.startDate).toDate()
            vm.endSetDate = moment(vm.endDate).toDate()
            $rootScope.$emit('changeDates', {
                startDate: vm.startDate,
                endDate: vm.endDate
            })
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
        vm.endDateMax = function (date) {
            const intervalDate = vm.rangeDate(vm.startSetDate, date)
            return intervalDate > 7 || intervalDate < 0 ? false : true
        }

        vm.formatDate = function (format) {
            const [year, month, day] = format.split('-')
            const date = new Date(year, month - 1, day)

            return date;
        }

        vm.rangeDate = function (startDate, endDate) {
            const dateStart = moment(startDate)
            const dateEnd = moment(endDate)

            return dateEnd.diff(dateStart, 'days')
        }

        vm.updateRangeDate = function (startDate, endDate) {
            vm.startDate = moment(startDate).format("YYYY-MM-DD")
            vm.endDate = moment(endDate).format("YYYY-MM-DD")

            vm.sendChangeDate()
            vm.getAsteroids(vm.startDate, vm.endDate)
        }

        //init
        vm.getAsteroids(vm.startDate, vm.endDate)
        vm.sendChangeDate(true)
    }

})()
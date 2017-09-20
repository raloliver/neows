(function () {
    angular.module('neows').controller('asteroidController', [
        '$scope',
        '$rootScope',
        '$http',
        'tabs',
        'moment',
        'asteroidService',
        AsteroidController
    ])

    function AsteroidController($scope, $rootScope, $http, tabs, moment, asteroidService) {
        const vm = this
        const momentDate = Date.now()

        //properties
        vm.activeDateTab = null
        vm.alerts = []
        vm.asteroid = []
        vm.asteroids = {}
        vm.initDateChange = true
        vm.endDate = moment(momentDate).format("YYYY-MM-DD")
        vm.endSetDate = moment(momentDate).toDate();
        vm.startDate = moment(vm.endDate).subtract(5, "days").format("YYYY-MM-DD")
        vm.startSetDate = moment(vm.endDate).subtract(5, "days").toDate()

        //functions
        vm.getAsteroids = function (startDate, endDate) {
            asteroidService.getAsteroidList(startDate, endDate)
                .then((res) => vm.listAsteroids(res.data))
        }

        vm.sendChangeDate = function (is) {
            vm.initDateChange = is

            vm.startSetDate = moment(vm.startDate).toDate()
            vm.endSetDate = moment(vm.endDate).toDate()
            $rootScope.$emit('changeDates', {
                startDate: vm.startDate,
                endDate: vm.endDate
            })
        }

        vm.listAsteroids = function (data) {
            vm.asteroids = data

            vm.asteroid = Object.keys(vm.asteroids.near_earth_objects)
                .map(key => {
                    return {
                        date: key,
                        near_earth_object: vm.asteroids.near_earth_objects[key]
                    }
                })
        }

        vm.getAlerts = function () {
            asteroidService.getAsteroidAlerts()
                .then((res) => vm.listAlerts(res.data))
        }

        vm.listAlerts = function (data) {
            vm.alerts = data
            console.log(vm.alerts)
        }

        //methods   
        vm.clone = function (index, {
            name,
            close_approach_data,
            is_potentially_hazardous_asteroid,
            neo_reference_id
        }) {
            let newAlert = angular.copy(vm.alerts.push({
                id: neo_reference_id,
                name: name,
                date: close_approach_data[0].close_approach_date,
                velocity: close_approach_data[0].relative_velocity.kilometers_per_hour,
                hazardous: is_potentially_hazardous_asteroid
            }))
            console.log(vm.alerts)
        }

        vm.endDateMax = function () {
            $scope.$broadcast('endSetDate')
        }

        vm.endDateBeforeRender = function ($view, $dates) {
            if (vm.startSetDate) {
                let activeDate = moment(vm.startSetDate).subtract(1, $view)
                let maxDaysAfter = moment(vm.startSetDate).add(5, 'day')

                $dates.filter(function (date) {
                    return date.localDateValue() >= maxDaysAfter.valueOf()
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false
                })
            }
        }

        vm.updateRangeDate = function (startDate, endDate) {
            vm.startDate = moment(startDate).format("YYYY-MM-DD")
            vm.endDate = moment(endDate).format("YYYY-MM-DD")

            vm.sendChangeDate()
            vm.getAsteroids(vm.startDate, vm.endDate)
        }

        //init   
        vm.getAlerts()
        vm.getAsteroids(vm.startDate, vm.endDate)
        vm.sendChangeDate(true)
        $scope.$watch('vm.startSetDate', () => {
            debugger;
            if (!vm.initDateChange) {
                vm.endSetDate = undefined
            } else {
                vm.initDateChange = !vm.initDateChange
            }
        })
    }

})()
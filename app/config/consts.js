angular.module('neows').constant('consts', {
    appName: 'NEOWS',
    version: '1.0.0',
    owner: '@raloliver',
    year: '2017',
    site: 'http://raloliver.com.br',
    apiKEY: 'N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD',
    apiURL: 'https://api.nasa.gov/neo/rest/v1',
    userKey: '_neows_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])
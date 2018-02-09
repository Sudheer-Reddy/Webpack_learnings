// import angular from 'angular';
// import ngRoute from 'angular-route';

(function () {
    'use strict';

    var Application = angular,
    myApp = Application.module('MyApp', ['ngRoute']);

    myApp.controller('HomeController', HomeController);

    function HomeController($scope) {
        $scope.message = 'Hello World!';
    }

    myApp.config(['$routeProvider', '$locationProvider', function ($rp, $lp) {
        // $lp.hashPrefix('');
        $lp.html5Mode(true);
        $rp.when('/users', {
            controller: 'UsersController',
            templateUrl: '../views/users.html'
        })
    }]);
}());
'use strict';

// Declare app level module which depends on views, and components
var myapp=angular.module('myApp', [ 'ngRoute']);



myapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/', {
        templateUrl: 'html/login.html',
        controller: 'loginCtrl'
    }).
    when('/accepted', {
        templateUrl: 'html/profile.html',
        controller: 'authCtrl'
    }).
    when('/start', {
        templateUrl: 'html/question.html',
        controller: 'questionCrtl'
    }).
    when('/complete', {
        templateUrl: 'html/complete.html',
        controller: 'completeCrtl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);


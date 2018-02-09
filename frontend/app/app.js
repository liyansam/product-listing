'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.productList',
    'myApp.submitProduct',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/productList'});
}]).controller('appCtrl', ['$scope', '$rootScope', '$http', '$location', '$cookieStore', function ($scope, $rootScope, $http, $location, $cookieStore) {
    console.log($location.path());
}]);

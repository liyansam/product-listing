'use strict';

angular.module('myApp.submitProduct', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/submitProduct', {
            templateUrl: 'submitProduct/submitProduct.html',
            controller: 'submitProductCtrl'
        });
    }])
    .controller('submitProductCtrl', ['$scope', '$http', '$cookieStore', '$location', function ($scope, $http, $cookieStore, $location) {
        $scope.submit = function() {
            $http.post('http://localhost:3000/products', JSON.stringify($scope.product))
            .then(function successCallback(response){
                console.log(response);
                alert('Success!')
                $location.path('/productList');
            }, function errorCallback(response){
                console.log('product submit error');
                alert('Submit Error.');
            });
        }
    }]);

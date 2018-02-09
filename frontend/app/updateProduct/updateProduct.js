'use strict';

angular.module('myApp.updateProduct', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/updateProduct', {
            templateUrl: 'updateProduct/updateProduct.html',
            controller: 'UpdateProductCtrl'
        });
    }])
    .controller('UpdateProductCtrl', ['$scope', '$rootScope', '$http', '$cookieStore', '$location', function ($scope, $rootScope, $http, $cookieStore, $location) {

        $http.get('http://localhost:3000/products/' + $rootScope.updateId)
        .then(function successCallback(response){
            $scope.product = response.data;
        }, function errorCallback(response){
            console.log('load product by id error');
            alert('Error when getting product by id');
        });

        $scope.update = function() {
            $http.put('http://localhost:3000/products/' + $rootScope.updateId, JSON.stringify($scope.product))
            .then(function successCallback(response){
                console.log(response);
                alert('Update Successfully!')
                $location.path('/productList');
            }, function errorCallback(response){
                console.log('product update error');
                alert('Update Error.');
            });
        }
    }]);

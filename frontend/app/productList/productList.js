'use strict';

angular.module('myApp.productList', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/productList', {
            templateUrl: 'productList/productList.html',
            controller: 'ProductListCtrl'
        });
    }])
    .controller('ProductListCtrl', ['$scope', '$rootScope', '$http', '$cookieStore', '$location', function ($scope, $rootScope, $http, $cookieStore, $location) {
        $scope.conferences = [];

        $http.get('http://localhost:3000/products')
        .then(function successCallback(response){
            $scope.products = response.data;
        }, function errorCallback(response){
            console.log('load products error');
            alert('Error when getting product list');
        });

        $scope.search = function(item) {
            if (
                (!$scope.searchText ||
                (item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) ||
                (item.description.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1))
            )
            {
                return true;
            }
            return false;
        };

        $scope.add = function() {
            $location.path('/submitProduct');
        };

        $scope.delete = function(id) {
            console.log(id);
            $http.delete('http://localhost:3000/products/' + id)
            .then(function successCallback(response){
                alert('Delete Successfully.');
                $http.get('http://localhost:3000/products')
                .then(function successCallback(response){
                    $scope.products = response.data;
                }, function errorCallback(response){
                    console.log('load products error');
                    alert('Error when getting product list');
                });
            }, function errorCallback(response){
                console.log('delete product error');
                alert('Error when deleting a product');
            });
        };

        $scope.update = function(id) {
            $rootScope.updateId = id;
            $location.path('/updateProduct');
        }

    }]);

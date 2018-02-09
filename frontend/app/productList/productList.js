'use strict';

angular.module('myApp.productList', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/productList', {
            templateUrl: 'productList/productList.html',
            controller: 'ProductListCtrl'
        });
    }])
    .controller('ProductListCtrl', ['$scope', '$rootScope', '$http', '$cookieStore', '$location', function ($scope, $rootScope, $http, $cookieStore, $location) {
        $scope.products = [];

        $http.get('http://localhost:3000/products')
        .then(function successCallback(response){
            $scope.products = response.data;
            $scope.products.forEach(function(e){
                var myDate = new Date(e.created_at);
                e.created_at_string = myDate.toDateString();
            });
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
        };

        $scope.sortByPriceHigh = function() {
            $scope.products.sort(function(a, b){
                var keyA = a.price,
                    keyB = b.price;
                // Compare the 2 dates
                if(keyA < keyB) return 1;
                if(keyA > keyB) return -1;
                return 0;
            });
        };

        $scope.sortByPriceLow = function() {
            $scope.products.sort(function(a, b){
                var keyA = a.price,
                    keyB = b.price;
                // Compare the 2 dates
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });
        };

        $scope.sortByDateNew = function() {
            $scope.products.sort(function(a, b){
                var keyA = new Date(a.created_at),
                    keyB = new Date(b.created_at);
                // Compare the 2 dates
                if(keyA < keyB) return 1;
                if(keyA > keyB) return -1;
                return 0;
            });
        };

        $scope.sortByDateOld = function() {
            $scope.products.sort(function(a, b){
                var keyA = new Date(a.created_at),
                    keyB = new Date(b.created_at);
                // Compare the 2 dates
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });
        };

    }]);

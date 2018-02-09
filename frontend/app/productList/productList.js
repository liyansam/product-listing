'use strict';

angular.module('myApp.productList', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/productList', {
            templateUrl: 'productList/productList.html',
            controller: 'productListCtrl'
        });
    }])
    .controller('productListCtrl', ['$scope', '$rootScope', '$http', '$cookieStore', '$location', function ($scope, $rootScope, $http, $cookieStore, $location) {
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
                (item.description.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)
            )
            {
                return true;
            }
            return false;
        };

        $scope.add = function(){
            $location.path('/submitProduct');
        }

        $scope.update = function(product.id){

        }

    }]);

angular.module('flapperNews')
.controller('weerController', ['$scope', 'weerFactory', function($scope, weerFactory) {
    $scope.weerData = weerFactory.dagen;
}]);
angular.module('flapperNews')
.controller('weerController', ['$scope', 'weerFactory', function($scope, weerFactory) {
    $scope.weerData = weerFactory.dagen;

    console.log('data: ' + $scope.weerData);
    $scope.images=[{src:'img1.png',title:'Pic 1'},{src:'img2.jpg',title:'Pic 2'},{src:'img3.jpg',title:'Pic 3'},{src:'img4.png',title:'Pic 4'},{src:'img5.png',title:'Pic 5'}]; 
}]);
angular.module('flapperNews')
.controller('MainCtrl', [
  '$scope', 
  'posts', 
  'auth',
  function($scope, posts, auth) {

    $scope.test = 'Hellow world!';
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.posts = posts.posts;

    $scope.addPost = function () {
      if(!$scope.title) {
        return;
      }
      posts.create({
        title: $scope.title,
        link: $scope.link
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = posts.upvote;
    $scope.decreaseUpvotes = posts.downvote;

  }
]);
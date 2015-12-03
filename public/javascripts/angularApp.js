angular.module('flapperNews', ['ui.router'])
.factory('posts', ['$http', 'auth', function($http, auth){
  var o = {
    posts: []
  };

  // get all posts
  o.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, o.posts);
    });
  };

  // create new posts
  o.create = function(post) {
    return $http.post('/posts', post, {
      headers: {Authorization: 'Bearer '+ auth.getToken()}
    }).success(function(data){
      o.posts.push(data);
    });
  };

  // upvote
  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+ auth.getToken()}
    }).success(function(data){
      post.upvotes += 1;
    });
  };

  // downvote
  o.downvote = function(post) {
    return $http.put('/posts/' + post._id + '/downvote', null, {
      headers: {Authorization: 'Bearer '+ auth.getToken()}
    }).success(function(data){
      post.upvotes -= 1;
    });
  };

  // get single post
  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res) {
      return res.data;
    });
  };

  // delete single post
  o.delete = function(post) {
    return $http.delete('/posts/' + post._id).success(function(data) {
      angular.copy(data, o.posts);
    });
  };

  // add comment
  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment, {
      headers: {Authorization: 'Bearer '+ auth.getToken()}
    });
  };

  // upvote comment
  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+ auth.getToken()}
    }).success(function(data){
      comment.upvotes += 1;
    });
  };

  // downvote comment
  o.downvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/downvote', null, {
      headers: {Authorization: 'Bearer '+ auth.getToken()}
    }).success(function(data){
      comment.upvotes -= 1;
    });
  };

  return o;
}])

.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken = function (token){
		$window.localStorage['flapper-news-token'] = token;
	};

	auth.getToken = function (){
		return $window.localStorage['flapper-news-token'];
	};

	auth.isLoggedIn = function(){
		var token = auth.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.register = function(user){
		return $http.post('/register', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user){
		return $http.post('/login', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function(){
  	$window.localStorage.removeItem('flapper-news-token');
	};

	return auth;
}])
 
.directive('weer', function ($timeout) {
  return {
    restrict: 'AE',
  replace: true,
  scope: true,
    link: function (scope, elem, attrs) {
  
    scope.currentIndex=0;

    /*volgende of vorige dag tonen wanneer men op de desbetreffende knop klikt*/
    scope.next=function(){
      scope.currentIndex<scope.weerData.length-1?scope.currentIndex++:scope.currentIndex=0;
    };
    
    scope.prev=function(){
      scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.weerData.length-1;
    };
    
    scope.$watch('currentIndex',function(){
      scope.weerData.forEach(function(item){
        item.visible=false;
      });
      scope.weerData[scope.currentIndex].visible=true;
    });
    
    /*Automatisch volgende dag tonen adhv tijdsinterval*/
    var timer;
    
    var sliderFunc=function(){
      timer=$timeout(function(){
        scope.next();
        timer=$timeout(sliderFunc,5000);
      },5000);
    };
    
    sliderFunc();
    
    scope.$on('$destroy',function(){
      $timeout.cancel(timer);
    });
    
    },
  templateUrl: '/template/weer.html'
  };
});
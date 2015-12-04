angular.module('flapperNews')
.factory('posts', [
	'$http', 
	'auth', 
	function($http, auth){
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
}]);
angular.module('flapperNews')
.factory('weerFactory', [
  '$http', 
  function($http){
    var o = {
      dagen: []
    };

    o.getWeersvoorspellingen = function() {
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=9890&mode=json&units=metric&cnt=5&APPID=1915045e7d99dc089dce5278018d0a13')
        .success(function(data) {
          console.log('dagen:' + o.dagen);
          console.log(data);
          
          o.dagen.length = 0;

          //angular.copy(data.city, o.dagen);
          for(var i = 0; i < data.list.length; i++){
            console.log(data.list[i]);
            o.dagen.push({
              type: data.list[i].weather[0].main
            });
          }
          //o.dagen.push(data.city);
          console.log('dagen:' + o.dagen[0].type);
        });
    };

  return o;

}]);
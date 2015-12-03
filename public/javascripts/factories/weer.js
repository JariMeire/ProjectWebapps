angular.module('flapperNews')
.factory('weerFactory', [
  '$http', 
  function($http){
    var o = {
      dagen: []
    };

    o.getWeersvoorspellingen = function() {
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=9890&mode=json&units=metric&cnt=7&APPID=1915045e7d99dc089dce5278018d0a13')
        .success(function(data) {
          o.dagen.length = 0;
          o.vulDagenOp(data.list);
        });
    };

    o.vulDagenOp = function(data){
      for(var i = 0; i < data.length; i++){
        o.dagen.push({
          type: o.zetTypeOm(data[i].weather[0].main),
          beschrijving: o.zetBeschrijvingOm(data[i].weather[0].description),
          temperatuur: o.bepaalTemperatuur(data[i].temp.min, data[i].temp.max),
          dag: o.bepaalDag(data[i].dt, i)
        });
      }
    };

    o.zetTypeOm = function(type){
      switch(type){
        case "Rain":
          return "Regen";
        case "Clouds":
          return "Bewolkt";
        case "Clear":
          return "Helder";
        default:
          return type;
      }
    };

    o.zetBeschrijvingOm = function(beschrijving){
      switch(beschrijving){
        case "light rain":
          return "lichte regen";
        case "moderate rain":
          return "af en toe buien";
        case "heavy intensity rain":
          return "zware regenval";
        case "sky is clear":
          return "heldere hemel";
        case "broken clouds":
          return "bewolkt";
        default:
          return beschrijving;
      }
    };

    o.bepaalTemperatuur = function(min, max){
      var temperatuur = (min + max) / 2;
      return Math.round(temperatuur);
    };

    o.bepaalDag = function(tijd, teller){
      if(teller === 0){
        return "Vandaag";
      } else if(teller === 1){
        return "Morgen";
      } else{
        var datum = new Date(tijd * 1000);
        var dag = datum.getDay();
        return o.dagToString(dag);
      }
    };

    o.dagToString = function(dag){
      switch(dag){
        case 0:
          return "Zondag";
        case 1:
          return "Maandag";
        case 2:
          return "Dinsdag";
        case 3:
          return "Woensdag";
        case 4:
          return "Donderdag";
        case 5:
          return "Vrijdag";
        case 6:
          return "Zaterdag";
        default:
          return dag;
      }
    };

  return o;

}]);
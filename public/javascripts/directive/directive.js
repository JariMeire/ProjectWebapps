angular.module('flapperNews')
.directive('weer', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    link: function(scope, elem, attrs) {

      scope.huidigeIndex = 0;

      /*volgende of vorige dag tonen wanneer men op de desbetreffende knop klikt*/
      scope.volgendeDag = function() {
        scope.huidigeIndex < scope.weerData.length - 1 ? scope.huidigeIndex++ : scope.huidigeIndex = 0;
      };

      scope.vorigeDag = function() {
        scope.huidigeIndex > 0 ? scope.huidigeIndex-- : scope.huidigeIndex = scope.weerData.length - 1;
      };

      scope.$watch('huidigeIndex', function() {
        scope.weerData.forEach(function(item) {
          item.visible = false;
        });
        scope.weerData[scope.huidigeIndex].visible = true;
      });

      /*Automatisch volgende dag tonen adhv tijdsinterval*/
      var timer;

      var toonVolgendeDag = function() {
        timer = $timeout(function() {
          scope.volgendeDag();
          timer = $timeout(toonVolgendeDag, 5000);
        }, 5000);
      };

      toonVolgendeDag();

      scope.$on('$destroy', function() {
        $timeout.cancel(timer);
      });
    },
    templateUrl: '/template/weer.html'
  };
});
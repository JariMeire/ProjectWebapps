angular.module('flapperNews')
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
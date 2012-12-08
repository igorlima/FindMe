'use strict';

/* Controllers */
lancheOnlineApp
  .controller( "HomeCtrl", ['$scope', function(ng) {
    activeCurrentLink();
    circle_progess();
    widthFunctions();
  }])

  .controller( "PedidosCtrl", ['$scope', function(ng) {
    activeCurrentLink();
    widthFunctions();
  }])

  .controller( "MensagensCtrl", ['$scope', function(ng) {
    activeCurrentLink();
    widthFunctions();
  }])
  ;

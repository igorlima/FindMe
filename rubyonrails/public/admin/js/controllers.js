'use strict';

/* Controllers */
lanchesOnlineApp
  .controller( "HomeCtrl", ['$scope', function(ng) {
    circle_progess();
  }])

  .controller( "CardapiosCtrl", ['$scope', function(ng) {
    
    $('.btn-minimize').click(function(e){
      e.preventDefault();
      var $target = $(this).parent().parent().next('.box-content');
      if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
      else             $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
      $target.slideToggle();
    });

  }])

  .controller( "PedidosCtrl", ['$scope', function(ng) {

  }])

  .controller( "MensagensCtrl", ['$scope', function(ng) {

  }])
  ;


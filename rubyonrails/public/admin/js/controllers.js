'use strict';

/* Controllers */
lancheOnlineApp
  .controller( "HomeCtrl", ['$scope', function(ng) {
    activeCurrentLink();
    circle_progess();
    widthFunctions();
  }])

  .controller( "CardapiosCtrl", ['$scope', 'Cardapio', function(ng, Cardapio) {

    ng.cardapios = [];

    var listarCardapios = function() {
      Cardapio.all(function(data){
        ng.cardapios = data;
        ng.has_cardapios = ng.cardapios.length > 0 ? true : false;
      });
    };
    listarCardapios();
    
    $('.btn-minimize').click(function(e){
      e.preventDefault();
      var $target = $(this).parent().parent().next('.box-content');
      if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
      else             $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
      $target.slideToggle();
    });

    activeCurrentLink();
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

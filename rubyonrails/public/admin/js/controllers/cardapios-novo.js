'use strict';

lancheOnlineApp.

controller( "CardapiosNovoCtrl", ['$rootScope', '$scope', 'Cardapio',
  function(root, ng, Cardapio) {

    ng.cardapio = {};

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

;

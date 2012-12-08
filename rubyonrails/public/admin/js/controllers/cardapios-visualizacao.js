'use strict';

lancheOnlineApp.

controller( "CardapiosVisualizacaoCtrl", ['$rootScope', '$scope', '$location', 'Cardapio',
  function(root, ng, loc, Cardapio) {

    if (!root.cardapio) 
      loc.path('cardapios');

    ng.voltar = function() {
      loc.path('cardapios');
    };

    ng.editar = function() {
      loc.path('cardapios-edicao');
    };

    $('.btn-minimize').click(function(e){
      e.preventDefault();
      var $target = $(this).parent().parent().next('.box-content');
      if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
      else             $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
      $target.slideToggle();
    });

    widthFunctions();

  }])
;

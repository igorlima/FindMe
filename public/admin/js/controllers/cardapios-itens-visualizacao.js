'use strict';

lancheOnlineApp.

controller( "CardapiosItensVisualizacaoCtrl", ['$rootScope', '$scope', '$location', 'Cardapio',
  function(root, ng, loc, Cardapio) {
    !root.cardapioItem && loc.path('cardapios-itens');

    ng.voltar = function() {
      loc.path('cardapios-itens');
    };

    ng.editar = function() {
      loc.path('cardapios-itens-edicao');
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

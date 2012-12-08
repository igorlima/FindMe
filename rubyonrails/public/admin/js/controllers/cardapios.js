lancheOnlineApp.controller( "CardapiosCtrl", ['$rootScope', '$scope', 'Cardapio', 

  function(root, ng, Cardapio) {
    root.cardapios = root.cardapios || [];

    var listarCardapios = function() {
      Cardapio.all(function(data){
        root.cardapios = data;
        ng.has_cardapios = ng.cardapios.length > 0 ? true : false;
      });
    };
    listarCardapios();

    ng.visualizar = function(cardapio) {
      root.cardapio = cardapio;
    };

    ng.editarItens = function(cardapio) {
      root.cardapio = cardapio;
    };

    ng.editar = function(cardapio) {
      root.cardapio = cardapio;
    };

    ng.excluir = function(cardapio) {
      root.cardapios = [];
      listarCardapios();
    };
    
    $('.btn-minimize').click(function(e){
      e.preventDefault();
      var $target = $(this).parent().parent().next('.box-content');
      if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
      else             $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
      $target.slideToggle();
    });

    activeCurrentLink();
    widthFunctions();
    
  }]);

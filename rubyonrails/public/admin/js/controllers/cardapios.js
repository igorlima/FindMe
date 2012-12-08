lancheOnlineApp.controller( "CardapiosCtrl", ['$rootScope', '$scope', 'Cardapio', 

  function(root, ng, Cardapio) {
    ng.cardapios = [];
    ng.carregando = true;

    var listarCardapios = function() {
      Cardapio.all(function(data){
        ng.cardapios = data;
        ng.carregando = false;
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
      ng.cardapios = [];
      ng.carregando = true;
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

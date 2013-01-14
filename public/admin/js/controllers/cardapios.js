'use strict';

lancheOnlineApp.

controller( "CardapiosCtrl", ['$rootScope', '$scope', 'Cardapio',
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

    ng.itens = function(cardapio) {
      root.cardapio = cardapio;
    };

    ng.editar = function(cardapio) {
      root.cardapio = cardapio;
    };

    ng.excluir = function(cardapio) {
      ng.cardapio = cardapio;
      $('#modalExcluirCardapio').modal('show');
    };

    ng.excluirCardapio = function(event) {
      event.preventDefault();
      ng.carregando = true;
      $('#modalExcluirCardapio').modal('hide');

      var alerta = $('#alerta').empty();
      Cardapio.remove( {id:ng.cardapio._id},
        function(data){
          alerta.append(
            "<div class='alert alert-success'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Exclusão realizada com sucesso!</strong> O cardápio foi excluído da listagem."+
            "</div>"
          );
          listarCardapios();
        },
        function(data){
          alerta.append(
            "<div class='alert alert-error'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Atenção!</strong> Ocorreu algum problema ao excluir. Por favor, tente mais tarde."+
            "</div>"
          );
          listarCardapios();
        }
      );
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

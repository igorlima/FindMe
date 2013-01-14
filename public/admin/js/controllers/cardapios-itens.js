'use strict';

lancheOnlineApp.

controller( "CardapiosItensCtrl", ['$rootScope', '$scope', '$location', 'CardapioItem',
  function(root, ng, loc, CardapioItem) {
    !root.cardapio && loc.path('cardapios');

    ng.itens = [];
    ng.carregando = true;

    var listarItens = function() {
      CardapioItem.all( {cardapio:root.cardapio._id}, function(data) {
        ng.itens = data;
        ng.carregando = false;
      });
    };
    listarItens();

    ng.voltar = function() {
      loc.path('cardapios');
    };

    ng.visualizar = function(item) {
      root.cardapioItem = item;
    };

    ng.editar = function(item) {
      root.cardapioItem = item;
    };

    ng.excluir = function(item) {
      ng.cardapioItem = item;
      $('#modalExcluirItem').modal('show');
    };

    ng.excluirItem = function(event) {
      event.preventDefault();
      ng.carregando = true;
      $('#modalExcluirItem').modal('hide');

      var alerta = $('#alerta').empty();
      CardapioItem.remove( 
        {
          id:ng.cardapioItem._id,
          cardapio:root.cardapio._id
        },
        function(data){
          alerta.append(
            "<div class='alert alert-success'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Exclusão realizada com sucesso!</strong> O item foi excluído do cardápio."+
            "</div>"
          );
          listarItens();
        },
        function(data){
          alerta.append(
            "<div class='alert alert-error'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Atenção!</strong> Ocorreu algum problema ao excluir. Por favor, tente mais tarde."+
            "</div>"
          );
          listarItens();
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

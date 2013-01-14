'use strict';

lancheOnlineApp.

controller( "CardapiosItensEdicaoCtrl", ['$rootScope', '$scope', '$location', 'CardapioItem',
  function(root, ng, loc, CardapioItem) {
    !root.cardapioItem && loc.path('cardapios-itens');

    ng.voltar = function() {
      loc.path('cardapios-itens');
    };

    ng.editar = function(event) {
      event.preventDefault();
      var alerta = $('#alerta').empty();
      CardapioItem.update( 
        {
          id:root.cardapioItem._id,
          cardapio:root.cardapio._id
        }, 
        root.cardapioItem,
        function(data){
          alerta.append(
            "<div class='alert alert-success'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Edição realizada com sucesso!</strong> A edição de do novo cardápio já está disponivel."+
            "</div>"
          );
        },
        function(data){
          alerta.append(
            "<div class='alert alert-error'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Atenção!</strong> Ocorreu algum problema ao salvar. Por favor, tente mais tarde."+
            "</div>"
          );
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

    widthFunctions();

  }])
;

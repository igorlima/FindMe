'use strict';

lancheOnlineApp.

controller( "CardapiosItensNovoCtrl", ['$rootScope', '$scope', '$location', 'CardapioItem',
  function(root, ng, loc, CardapioItem) {
    !root.cardapio && loc.path('cardapios');

    ng.item = {};

    ng.voltar = function() {
      loc.path('cardapios-itens');
    };

    ng.salvar = function(event) {
      event.preventDefault();
      var alerta = $('#alerta').empty();
      CardapioItem.save( {cardapio:root.cardapio._id}, ng.item,
        function(data){
          alerta.append(
            "<div class='alert alert-success'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Salvo com sucesso!</strong> O novo item já está disponivel no cardápio."+
            "</div>"
          );
          ng.item = {};
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

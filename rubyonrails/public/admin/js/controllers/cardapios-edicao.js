'use strict';

lancheOnlineApp.

controller( "CardapiosEdicaoCtrl", ['$rootScope', '$scope', '$location', 'Cardapio',
  function(root, ng, loc, Cardapio) {

    if (!root.cardapio) 
      ng.voltar();

    ng.voltar = function() {
      loc.path('cardapios');
    };

    ng.editar = function(event) {
      event.preventDefault();
      var alerta = $('#alerta').empty();
      Cardapio.update( {id:root.cardapio._id}, root.cardapio,
        function(data){
          alerta.append(
            "<div class='alert alert-success'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Edição realizada com sucesso!</strong> O edição do cardápio já está disponivel na listagem."+
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

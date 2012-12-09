'use strict';

/* Controllers */
lancheOnlineApp.

controller( "MensagensCtrl", ['$rootScope', '$scope', 'Mensagem',
  function(root, ng, Mensagem) {

    ng.visualizar = function(mensagem) {
      ng.mensagem = mensagem;
      $('#modalVisualizarMensagem').modal('show');
    };

    ng.excluir = function(mensagem) {
      ng.mensagem = mensagem;
      $('#modalExcluirMensagem').modal('show');
    };

    ng.excluirMensagem = function(event) {
      event.preventDefault();
      ng.carregando = true;
      $('#modalExcluirMensagem').modal('hide');

      var alerta = $('#alerta').empty();
      Mensagem.remove( {id:ng.mensagem._id},
        function(data){
          alerta.append(
            "<div class='alert alert-success'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Exclusão realizada com sucesso!</strong> A mensagem foi excluída da listagem."+
            "</div>"
          );
          !root.carregandoMensagens && root.listarMensagens();
        },
        function(data){
          alerta.append(
            "<div class='alert alert-error'>"+
              "<button type='button' class='close' data-dismiss='alert'>×</button>"+
              "<strong>Atenção!</strong> Ocorreu algum problema ao excluir. Por favor, tente mais tarde."+
            "</div>"
          );
          !root.carregandoMensagens && root.listarMensagens();
        }
      );
    };
    
    activeCurrentLink();
    widthFunctions();

  }
]);

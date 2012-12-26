'use strict';

/* Controllers */
lancheOnlineApp.

controller( "PedidosCtrl", ['$rootScope', '$scope', 'Pedido',
  function(root, ng, Pedido) {

    var atualizarPedidos = function() {
      !root.carregandoPedidos && root.listarPedidos();
    };

    ng.visualizar = function(pedido) {
      ng.pedido = pedido;
      $('#modalVisualizarPedido').modal('show');
    };

    ng.fazendoPedido = function() {
      Pedido.doing( {id: ng.pedido.id}, {},
        function(data){
          atualizarPedidos();
        },
        function(data){
          atualizarPedidos();
        }
      );
    };

    ng.pedidoPronto = function() {
      Pedido.done( {id: ng.pedido.id}, {},
        function(data){
          atualizarPedidos();
        },
        function(data){
          atualizarPedidos();
        }
      );
    };

    ng.pedidoEntregue = function() {
      Pedido.delivered( {id: ng.pedido.id}, {},
        function(data){
          atualizarPedidos();
        },
        function(data){
          atualizarPedidos();
        }
      );
    };

    activeCurrentLink();
    widthFunctions();

  }
]);

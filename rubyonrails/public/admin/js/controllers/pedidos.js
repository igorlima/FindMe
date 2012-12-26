'use strict';

/* Controllers */
lancheOnlineApp.

controller( "PedidosCtrl", ['$rootScope', '$scope', 'Pedido',
  function(root, ng, Pedido) {

    var STATUS = {
      "PENDING": {
        name: "Pendente",
        style: "default"
      },
      "PAID": {
        name: "Pago",
        style: "warning"
      },
      "DOING": {
        name: "Preparando pedido",
        style: "info"
      },
      "DONE": {
        name: "Pedido preparado",
        style: "success"
      },
      "DELIVERED": {
        name: "Pedido entregue",
        style: "important"
      },
      "REFUNDED": {
        name: "Pedido reembolsado",
        style: "inverse"
      }
    };

    var atualizarPedidos = function() {
      !root.carregandoPedidos && root.listarPedidos();
    };

    ng.visualizar = function(pedido) {
      ng.pedido = pedido;
      $('#modalVisualizarPedido').modal('show');
    };

    ng.status = function(pedido) {
      return STATUS[pedido.status];
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

;(function(Perfil, $, ko, vm) {

  var STATUS = {
    'PENDING': {
      name: 'Pendente',
      style: 'count'
    },
    'PAID': {
      name: 'Pago',
      style: 'count'
    },
    'DOING': {
      name: 'Preparando pedido',
      style: 'count-main'
    },
    'DONE': {
      name: 'Pedido preparado',
      style: 'count-positive'
    },
    'DELIVERED': {
      name: 'Pedido entregue',
      style: 'count'
    },
    'REFUNDED': {
      name: 'Pedido reembolsado',
      style: 'count'
    }
  };

  var Ordens = Perfil.Ordens = Lanche.Ordens || function() {};
  Ordens.load = function() {
    vm.title('Meus Pedidos');
    vm.url_voltar('#perfil');
    vm.showBtnVoltar(true);
    vm.showMap(false);

    $.getJSON('/user/lastOrders.json', function(data) {
      vm.pedidos(data);
      $('#phone-app').load( 'partials/perfil_pedidos.html', function(){
        applyBindings();
        Lanche.spinner.stop();
      });
    });

  };

  var applyBindings = function() {
    var hasPedidos = vm.pedidos() ? vm.pedidos().length > 0 : false;
    vm.hasPedidos = ko.observable( hasPedidos );
    hasPedidos && vm.pedidos().forEach(function(pedido){
      pedido.status = STATUS[pedido.status];
    });

    ko.applyBindings(vm);
  };

  // Observable
  !function () {
    vm.pedidos = ko.observable(null);
  }();
  
})(window.Lanche.Perfil, Zepto, ko, Lanche.viewModel);

;(function(window, $, ko, vm) {
  var Lanche = window.Lanche;

  var Compra = Lanche.Compra = function(){};
  Compra.load = function() {
    vm.title('Finalizando Pedido');
    vm.showBtnVoltar(false);
    vm.showMap(false);

    Lanche.spinner.start();
    $('#phone-app').load( 'partials/compra.html', function() {
      applyBindings();
      vm.configuration().online_fee && Lanche.spinner.stop();
    });

  };

  var applyBindings = function() {
    vm.compra = ko.observable({
      address:{
        city: 'Lavras'
      }
    });
    Lanche.User.loadLastAddress( function(address) {
      var compra = vm.compra();
      compra.address.street   = address.street ? address.street : '';
      compra.address.number   = address.number ? address.number : '';
      compra.address.district = address.district ? address.district : '';
      vm.compra(compra);
    });

    vm.onlineFee = ko.computed(function() {
      return vm.configuration().online_fee ? parseFloat(vm.configuration().online_fee) : 0.00;
    });
    vm.deliveryFee = ko.computed(function() {
      return vm.configuration().delivery_fee ? parseFloat(vm.configuration().delivery_fee) : 0.00;
    });
    vm.strOnlineFee = ko.computed(function() {
      return 'R$ ' + vm.onlineFee().toFixed(2);
    });
    vm.strDeliveryFee = ko.computed(function() {
      return 'R$ ' + vm.deliveryFee().toFixed(2);
    });
    vm.strTotalPedido = ko.computed(function() {
      var total = vm.totalPedido() + vm.deliveryFee() + vm.onlineFee();
      return 'R$ ' + total.toFixed(2);
    });
    vm.checkout = function() {
      
      var checkout = vm.compra();
      checkout.authenticity_token = Lanche.User.data.authenticity_token;
      checkout.itens = [];
      vm.pedido().itens().forEach( function(item){
        checkout.itens.push({
          id: item._id,
          qty: item.qte()
        });
      });

      Lanche.spinner.start();
      $.post('/checkout', checkout, function(response){ 
        response = JSON.parse(response);
        var message_errors = Lanche.Util.message_errors(response.errors);
        message_errors && (alert(message_errors));
        response['checkout_paypal_url'] && (window.location.href = response['checkout_paypal_url']);
        Lanche.spinner.stop();
      });

    };
    ko.applyBindings(vm);
  };

  // Observable
  !function () {
    vm.configuration = ko.observable({});
    $.getJSON( '/configuration', function(data) {
      vm.configuration(data);
      Lanche.spinner.stop();
    });
  }();

})(window, Zepto, ko, Lanche.viewModel);

;(function(window, $, ko, vm) {
  var Lanche = window.Lanche;

  var Compra = Lanche.Compra = function(){};
  Compra.load = function() {
    vm.title('Finalizando Pedido');
    vm.showBtnVoltar(false);
    vm.showHomeContent(false);
    vm.showMap(false);

    createHtml();
    applyBindings();
    vm.configuration().online_fee && Lanche.spinner.stop();
  };

  var createHtml = function() {
    $('#phone-app')
    .empty()
    .append(""+
      "<div class='content-padded'>"+
        "<p class='welcome'>"+
          "O total do pedido ficou em "+
          "<strong data-bind='text: strTotalPedido'></strong>. "+
          "Foi acrescido <span data-bind='text: strOnlineFee'></span> da taxa online " +
          "e mais <span data-bind='text: strDeliveryFee'></span> da taxa de entrega." +
        "</p>"+
      "</div>"
    )
    .append(""+
      "<form class='contato'>"+
        "<div class='input-group'>"+
          "<div class='input-row'>"+
            "<label>Rua</label>"+
            "<input type='text' placeholder='Rua Elbert Vilela, 1669' data-bind='value: compra().address.street' >"+
          "</div>"+
          "<div class='input-row'>"+
            "<label>Bairro</label>"+
            "<input type='text' placeholder='Centenário' data-bind='value: compra().address.district' >"+
          "</div>"+
          "<div class='input-row'>"+
            "<label>Cidade</label>"+
            "<input type='text' data-bind='disable: true , value: compra().address.city' >"+
          "</div>"+
          "<div class='input-row'>"+
            "<label>Observação</label>"+
            "<textarea rows='5' placeholder='Próximo ao Postinho. X-Burguer sem maionese' data-bind='value: compra().observation' ></textarea>"+
          "</div>"+
        "</div>"+
        "<a class='button button-block' data-bind='click: checkout '>Comprar</a>"+
      "</form>"
    );
  };

  var applyBindings = function() {
    vm.compra = ko.observable({
      address:{
        city: 'Lavras'
      }
    });
    vm.onlineFee = ko.computed(function() {
      return vm.configuration().online_fee ? parseFloat(vm.configuration().online_fee) : 0.00;
    });
    vm.deliveryFee = ko.computed(function() {
      return vm.configuration().delivery_fee ? parseFloat(vm.configuration().delivery_fee) : 0.00;
    });
    vm.strOnlineFee = ko.computed(function() {
      return "R$ " + vm.onlineFee().toFixed(2);
    });
    vm.strDeliveryFee = ko.computed(function() {
      return "R$ " + vm.deliveryFee().toFixed(2);
    });
    vm.strTotalPedido = ko.computed(function() {
      var total = vm.totalPedido() + vm.deliveryFee() + vm.onlineFee();
      return "R$ " + total.toFixed(2);
    });
    vm.checkout = function() {
      
      var checkout = vm.compra();
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
        response['checkout_paypal_url'] && (window.location.href = response['checkout_paypal_url']);
        response.errors && response.errors.base && (alert(response.errors.base[0]));
        Lanche.spinner.stop();
      });

    };
    ko.applyBindings(vm);
  };

  // Observable
  !function () {
    vm.configuration = ko.observable({});
    $.getJSON( "/configuration", function(data) {
      vm.configuration(data);
      Lanche.spinner.stop();
    });
  }();

})(window, Zepto, ko, Lanche.viewModel);

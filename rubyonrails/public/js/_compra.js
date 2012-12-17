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
    Lanche.spinner.stop();
  };

  var createHtml = function() {
    $('#phone-app')
    .empty()
    .append(""+
      "<div class='content-padded'>"+
        "<p class='welcome'>"+
          "O total do pedido ficou em "+
          "<strong data-bind='text: strTotalPedido'></strong>. "+
          "Foi acrescido R$0.60 da taxa online e mais R$2.50 da taxa de entrega." +
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
            "<textarea rows='5' placeholder='Próximo ao Postinho. X-Burguer sem maionese' data-bind='value: compra().address.observation' ></textarea>"+
          "</div>"+
        "</div>"+
        "<a class='button button-block'>Comprar</a>"+
      "</form>"
    );
  };

  var applyBindings = function() {
    vm.compra = ko.observable({
      address:{
        city: 'Lavras'
      }
    });
    ko.applyBindings(vm);
  };

})(window, Zepto, ko, Lanche.viewModel);

;(function(window, $, ko, vm, P) {
  var hash_itens = {};
  var id_cardapio = null;

  var Item = window.Lanche.Cardapio.Item = function(){};
  Item.load = function() {
    id_cardapio = vm.cardapio()._id;
    vm.title( vm.cardapio().description );
    vm.welcome = ko.observable( vm.cardapio().welcome );
    vm.url_voltar( P.routes.previous );
    vm.showBtnVoltar(true);
    vm.showMap(false);

    if (!hash_itens[id_cardapio])
      loadCardapioConteudoFromServer();
    else
      createHtml();

  };

  var loadCardapioConteudoFromServer = function() {
    $.getJSON( vm.cardapio().json , function(data) {
      hash_itens[id_cardapio] = data;
      hash_itens[id_cardapio].forEach( function(item) {
        item.qte = ko.observable(0);
      });

      createHtml();
    });
  };

  var createHtml = function() {
    $('#phone-app').load( 'partials/cardapio_conteudo.html', function() {
      applyBindings();
      Lanche.spinner.stop();
    });
  };

  var applyBindings = function() {
    vm.itens = ko.observableArray(hash_itens[id_cardapio]);
    vm.moreItem = function(h) {
      vm.pedido().add(h);
    };
    vm.lessItem = function(h) {
      vm.pedido().remove(h);
    };
    vm.priceItem = function(h) {
      return "R$ " + parseFloat(h.price).toFixed(2);
    };
    vm.total = ko.computed(function() {
        var total = 0;
        for (var i=0; i < vm.itens().length; i++)
            total += vm.itens()[i].qte() * vm.itens()[i].price;
        return "R$ " + parseFloat(total).toFixed(2);
    });
    ko.applyBindings(vm);
  };

})(window, Zepto, ko, Lanche.viewModel, Path);

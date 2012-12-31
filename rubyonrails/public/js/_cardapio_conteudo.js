;(function(window, $, ko, vm, P) {
  var id_cardapio = null;

  var Item = window.Lanche.Cardapio.Item = function(){};
  Item.data = {};

  Item.load = function() {
    id_cardapio = vm.cardapio()._id;
    vm.title( vm.cardapio().description );
    vm.welcome = ko.observable( vm.cardapio().welcome );
    vm.url_voltar( P.routes.previous );
    vm.showBtnVoltar(true);
    vm.showMap(false);

    if (!Item.data[id_cardapio])
      loadCardapioConteudoFromServer();
    else
      createHtml();

  };

  var loadCardapioConteudoFromServer = function() {
    $.getJSON( vm.cardapio().json , function(data) {

      Item.data[id_cardapio] = data;
      Lanche.storage.get( 'cardapioItems', function(itens) {
        var itens = itens ? itens.data : {};
        itens[id_cardapio] = data;
        Lanche.storage.save({key: 'cardapioItems', data: itens}, function() {
          createHtml();
        });
      });

    });
  };

  var createHtml = function() {
    $('#phone-app').load( 'partials/cardapio_conteudo.html', function() {
      applyBindings();
      Lanche.spinner.stop();
    });
  };

  var applyBindings = function() {
    Item.data[id_cardapio].forEach( function(item) {
      item.qte = item.qte || ko.observable(0);
    });

    vm.itens = ko.observableArray(Item.data[id_cardapio]);
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

  //Local Storage
  !function () {
    Lanche.storage = new Lawnchair( function(storage) {
      storage.get( ['cardapioItems', 'pedido'], function(args) {
        var itens = args[0];
        var pedido = args[1];

        itens && (Item.data = itens.data);

        pedido && $.each(pedido.data, function(itemID, qte) {
          $.each(Item.data, function(cardapioID, itens) {
            $.each(itens, function(index, item) {
              (item._id == itemID) && (item.qte = ko.observable(qte));
            });
          });
        });

      });
    });
  }();

})(window, Zepto, ko, Lanche.viewModel, Path);

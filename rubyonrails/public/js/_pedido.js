;(function(Lanche, $, ko, vm, P) {
  
  var Pedido = Lanche.Pedido = function() {
    this._itens = this._itens || new list();
  };

  Pedido.fn = Pedido.prototype;

  Pedido.fn.length = function() {
    return this._itens.len();
  };

  Pedido.fn.contains = function(item) {
    return this._itens.hasKey(item._id);
  };

  Pedido.fn.get = function(item) {
    return this._itens.get(item._id);
  };

  Pedido.fn.itens = function() {
    return this._itens.values();
  };

  Pedido.fn.add = function(item) {
    if (!this._itens.hasKey(item._id))
      this._itens.add( item._id, item );

    item.qte( item.qte()+1 );
  };

  Pedido.fn.remove = function(item) {
    if( !this._itens.hasKey(item._id) ) return;

    item.qte( item.qte()-1 );
    if (item.qte() <= 0)
      this._itens.remove(item._id);

  };

  Pedido.load = function() {
    popover();

    Lanche.spinner.start();
    $('.popover').load( 'partials/pedido.html', function(){
      applyBindings();
      Lanche.spinner.stop();
    });
    
  };

  var popover = function() {
    $('.popover')
    .on('tap', keepOpen)
    .on('click', keepOpen)
    .css('display', 'block')
    ;

    $('html')
    .on('tap', close)
    .on('click', close);
  };

  var close = function(e) {
    $('.popover')
    .off('tap', keepOpen)
    .off('click', keepOpen)
    .css('display', 'none')
    ;

    $('html')
    .off('tap', close)
    .off('click', close);

  };

  var keepOpen = function(e) {
    e.stopPropagation();
  };

  var applyBindings = function() {
    vm.esvaziarPedido = function() {
      var itens = vm.pedido()._itens;
      itens.each( function(_id_item){
        itens.get(_id_item).qte(0);
        itens.remove(_id_item);
      });
      vm.showBtnPedido(false);
    };

    vm.showBtnPedido = ko.observable( vm.pedido().length() > 0 );

    vm.finalizarPedido = function() {
      close();
      Path.dispatch('#compra');
    };

    vm.subTotalItemPedido = function(i) {
      if (!i) return '';
      return "R$ " + parseFloat( i.qte() * i.price ).toFixed(2);
    };

    vm.totalPedido = ko.computed(function() {
        var total = 0;
        for (var i=0; i < vm.pedido().itens().length; i++)
            total += vm.pedido().itens()[i].qte() * vm.pedido().itens()[i].price;
        return parseFloat(total);
    });

    vm.strTotalPedido = ko.computed(function() {
        return "R$ " + vm.totalPedido().toFixed(2);
    });

    ko.applyBindingsToDescendants(vm, $('.popover')[0]);
  };

  // Routes
  !function () {
    P.map("#compra").to(function(){
      Lanche.spinner.start();
      head
      .js(
        "js/_compra.js",
        function() {
          Lanche.Compra.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    P.listen();
  }();

  // Inicializacao
  !function () {
    vm.pedido = ko.observable( new Pedido({}) );
    head
    .js(
      "js/lawnchair-0.6.1.min.js",
      function() {
        
      }
    );
  }();

})(window.Lanche, Zepto, ko, Lanche.viewModel, Path);

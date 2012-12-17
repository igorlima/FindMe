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
    Lanche.spinner.stop();

    createHtml();
    applyBindings();
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

  var createHtml = function() {
    $('.popover')
    .empty()
    .append(""+
      "<header class='popover-header'>"+
        "<a class='button' href='#' data-bind='visible: showBtnPedido, click: esvaziarPedido ' >"+
          "Esvaziar"+
        "</a>"+
        "<h3 class='title'>Meu Pedido</h3>"+
        "<a class='button' data-bind='visible: showBtnPedido, click: finalizarPedido ' >"+
          "Comprar"+
        "</a>"+
      "</header>"
    )
    .append(""+
      "<ul class='list' data-bind=\"visible: pedido().length() > 0 , foreach: { data: pedido().itens() , as: 'i' } \" >"+
        "<li>"+
          "<strong data-bind='text: i.description '></strong>"+
          " - <span data-bind='text: $root.subTotalItemPedido(i) '></span>" +
          "<span class='count-main' data-bind='text: i.qte '></span>"+
        "</li>"+
      "</ul>"
    )
    .append(""+
      "<ul class='list inset' data-bind='visible: pedido().length()>0' >"+
        "<li>"+
          "<strong>Total</strong>"+
          "<strong class='total' data-bind='text: strTotalPedido' ></strong>"+
        "</li>"+
      "</ul>"
    )
    .append(""+
      "<ul class='list inset' data-bind='visible: pedido().length()<=0' >"+
        "<li>"+
          "<strong>Nenhum item adicionado</strong>"+
        "</li>"+
      "</ul>"
    );
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
      .js("js/_compra.js")
      .ready(function(){
        Lanche.Compra.load();
      });
    }).enter(Lanche.Util.clearPanel);

    P.listen();
  }();

  // Inicializacao
  !function () {
    head
    .js("js/lawnchair-0.6.1.min.js")
    .js("js/jaylist.min.js", function() {
      vm.pedido = ko.observable( new Pedido({}) );
    });
  }();

})(window.Lanche, Zepto, ko, Lanche.viewModel, Path);

;(function(Lanche, $, ko, view) {
  
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
        "<a class='button' href='#' data-bind='visible: pedido().length() > 0, click: esvaziarPedido ' >"+
          "Esvaziar"+
        "</a>"+
        "<h3 class='title'>Meu Pedido</h3>"+
        "<a class='button' href='#' data-bind='visible: pedido().length() > 0 ' >"+
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
          "<strong class='total' data-bind='text: totalPedido' ></strong>"+
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
    view.esvaziarPedido = function() {
      var itens = view.pedido()._itens;
      itens.each( function(_id_item){
        itens.get(_id_item).qte(0);
        itens.remove(_id_item);
      });
    };

    view.subTotalItemPedido = function(i) {
      if (!i) return '';
      return "R$ " + parseFloat( i.qte() * i.price ).toFixed(2);
    };

    view.totalPedido = ko.computed(function() {
        var total = 0;
        for (var i=0; i < view.pedido().itens().length; i++)
            total += view.pedido().itens()[i].qte() * view.pedido().itens()[i].price;
        return "R$ " + parseFloat(total).toFixed(2);
    });

    ko.applyBindingsToDescendants(view, $('.popover')[0]);
  };

  // Inicializacao
  !function () {
    head
    .js("javascripts/lawnchair-0.6.1.min.js")
    .js("javascripts/jaylist.min.js", function() {
      view.pedido = ko.observable( new Pedido({}) );
    });
  }();

})(window.Lanche, Zepto, ko, Lanche.viewModel);

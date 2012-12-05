;(function(window, $, ko, viewModel, P){
  var hash_itens = {};
  var id_cardapio = null;

  var Item = window.Lanche.Cardapio.Item = function(){};
  Item.load = function() {
    id_cardapio = viewModel.cardapio()._id;
    viewModel.title( viewModel.cardapio().description );
    viewModel.welcome = ko.observable( viewModel.cardapio().welcome );
    viewModel.url_voltar( P.routes.previous );
    viewModel.showBtnVoltar(true);
    viewModel.showHomeContent(false);
    viewModel.showMap(false);

    if (!hash_itens[id_cardapio]) {
      loadCardapioConteudoFromServer();
    } else { 
      createHtml();
      applyBindings();
    }

    if (hash_itens[id_cardapio]) 
      Lanche.spinner.stop();

  };

  var loadCardapioConteudoFromServer = function() {
    $.getJSON( viewModel.cardapio().json , function(data) {
      hash_itens[id_cardapio] = data;
      hash_itens[id_cardapio].forEach( function(item) {
        item.qte = ko.observable(0);
      });

      createHtml();
      applyBindings();
      Lanche.spinner.stop();
    });
  };

  var createHtml = function() {
    $('#phone-app')
    .empty()
    .append(""+
      "<div class='content-padded'>"+
        "<p class='welcome' data-bind='text: welcome '></p>"+
      "</div>"
    )
    .append(""+
      "<ul class='list inset compra' data-bind=\"foreach: { data: itens, as: 'h' }\" >"+
        "<li>"+
          "<strong data-bind='text: h.description'></strong>"+
          "<span class='detail-lanche' data-bind='text: h.ingredients'></span>"+
          " - <span data-bind='text: $root.priceItem(h) '></span>" +
          "<span class='count' data-bind='text: h.qte'></span>" +
          "<a class='button-negative' data-bind='click: $root.lessItem'>-</a>"+
          "<a class='button-positive' data-bind='click: $root.moreItem'>+</a>"+
        "</li>"+
      "</ul>"
    )
    .append(""+
      "<ul class='list inset'>"+
        "<li>"+
          "<strong>Total</strong>"+
          "<strong class='total' data-bind='text: total'></strong>"+
        "</li>"+
      "</ul>"
    );
  };

  var applyBindings = function() {
    viewModel.itens = ko.observableArray(hash_itens[id_cardapio]);
    viewModel.moreItem = function(h) {
      viewModel.pedido().add(h);
      h.qte() < 5 && h.qte( h.qte()+1 );
    };
    viewModel.lessItem = function(h) {
      viewModel.pedido().remove(h);
      h.qte() > 0 && h.qte( h.qte()-1 );
    };
    viewModel.priceItem = function(h) {
      return "R$ " + parseFloat(h.price).toFixed(2);
    };
    viewModel.total = ko.computed(function() {
        var total = 0;
        for (var i=0; i < viewModel.itens().length; i++)
            total += viewModel.itens()[i].qte() * viewModel.itens()[i].price;
        return "R$ " + parseFloat(total).toFixed(2);
    });
    ko.applyBindings(viewModel);
  };

})(window, Zepto, ko, Lanche.viewModel, Path);

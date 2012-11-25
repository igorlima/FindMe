;(function(window, $, ko, viewModel){
  var hamburgueres = [
    {
      description: 'X-Burguer',
      ingredients: '(Pão, Carne e Queijo)',
      price: 5,
      qte: ko.observable(0)
    }
  ];

  var Hamburguer = window.Lanche.Cardapio.Hamburguer = function(){};
  Hamburguer.load = function() {
    viewModel.title('Hamburguer');
    viewModel.url_voltar('#cardapio');
    viewModel.showBtnVoltar(true);
    viewModel.showHomeContent(false);
    viewModel.showMap(false);

    createHtml();
    applyBindings();
  };

  var createHtml = function() {
    var app = $('#phone-app');
    app.empty();
    app.append(""+
      "<div class='content-padded'>"+
        "<p class='welcome'>Aprecie nosso(s) Hamburguer(es).</p>"+
      "</div>"
    );
    app.append(""+
      "<ul class='list inset compra' data-bind=\"foreach: { data: hamburgueres, as: 'h' }\" >"+
        "<li>"+
          "<strong data-bind='text: h.description'></strong>"+
          "<span class='detail-lanche' data-bind='text: h.ingredients'></span>"+
          " - <span data-bind='text: $root.priceHamburguer(h) '></span>" +
          "<span class='count' data-bind='text: h.qte'></span>" +
          "<a class='button-negative' data-bind='click: $root.lessHamburguer'>-</a>"+
          "<a class='button-positive' data-bind='click: $root.moreHamburguer'>+</a>"+
        "</li>"+
      "</ul>"
    );
    app.append(""+
      "<ul class='list inset'>"+
        "<li>"+
          "<strong>Total</strong>"+
          "<strong class='total' data-bind='text: total'></strong>"+
        "</li>"+
      "</ul>"
    );
  };

  var applyBindings = function() {
    viewModel.hamburgueres = ko.observableArray(hamburgueres);
    viewModel.moreHamburguer = function(h) {
      h.qte() < 5 && h.qte( h.qte()+1 );
    };
    viewModel.lessHamburguer = function(h) {
      h.qte() > 0 && h.qte( h.qte()-1 );
    };
    viewModel.priceHamburguer = function(h) {
      return "R$ " + h.price.toFixed(2);
    };
    viewModel.total = ko.computed(function() {
        var total = 0;
        for (var i=0; i < viewModel.hamburgueres().length; i++)
            total += viewModel.hamburgueres()[i].qte() * viewModel.hamburgueres()[i].price;
        return "R$ " + total.toFixed(2);
    });
    ko.applyBindings(viewModel);
  };

})(window, Zepto, ko, Lanche.viewModel);

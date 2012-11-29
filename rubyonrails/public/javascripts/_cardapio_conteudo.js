;(function(window, $, ko, viewModel, P){
  var hamburgueres = null;

  var Hamburguer = window.Lanche.Cardapio.Hamburguer = function(){};
  Hamburguer.load = function() {
    viewModel.title( viewModel.cardapio().description );
    viewModel.url_voltar( P.routes.previous );
    viewModel.showBtnVoltar(true);
    viewModel.showHomeContent(false);
    viewModel.showMap(false);

    if (!hamburgueres) {
      loadCardapioConteudoFromServer();
    } else { 
      createHtml();
      applyBindings();
    }

    if (hamburgueres) 
      Lanche.spinner.stop();

  };

  var loadCardapioConteudoFromServer = function() {
    $.getJSON( viewModel.cardapio().json , function(data) {
      hamburgueres = data;
      hamburgueres.forEach( function(hamburguer) {
        hamburguer.qte = ko.observable(0);
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
        "<p class='welcome'>Aprecie nosso(s) Hamburguer(es).</p>"+
      "</div>"
    )
    .append(""+
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
    viewModel.hamburgueres = ko.observableArray(hamburgueres);
    viewModel.moreHamburguer = function(h) {
      h.qte() < 5 && h.qte( h.qte()+1 );
    };
    viewModel.lessHamburguer = function(h) {
      h.qte() > 0 && h.qte( h.qte()-1 );
    };
    viewModel.priceHamburguer = function(h) {
      return "R$ " + parseFloat(h.price).toFixed(2);
    };
    viewModel.total = ko.computed(function() {
        var total = 0;
        for (var i=0; i < viewModel.hamburgueres().length; i++)
            total += viewModel.hamburgueres()[i].qte() * viewModel.hamburgueres()[i].price;
        return "R$ " + parseFloat(total).toFixed(2);
    });
    ko.applyBindings(viewModel);
  };

})(window, Zepto, ko, Lanche.viewModel, Path);

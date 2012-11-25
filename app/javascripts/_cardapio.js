;(function(window, $, ko, viewModel) {
  var cardapios = [
    {
      url: '#cardapio_hamburguer',
      description: 'Hamburguer'
    }
  ];

  var Cardapio = window.Lanche.Cardapio = function(){};
  Cardapio.load = function() {
    viewModel.title('Cardápio');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showHomeContent(false);

    Cardapio.createHtml();
    Cardapio.applyBindings();
  };

  Cardapio.createHtml = function() {
    var app = $('#phone-app');
    app.empty();
    app.append(""+
      "<div class='content-padded'>"+
        "<p class='welcome'>Aprecie nosso cardárpio.</p>"+
      "</div>"
    );
    app.append(""+
      "<ul class='list inset' data-bind=\"foreach: { data: cardapios, as: 'c' }\" >"+
        "<li>"+
          "<a data-bind='attr: { href: c.url }'>"+
            "<strong data-bind='text: c.description'></strong>"+
            "<span class='chevron'></span>"+
          "</a>"+
        "</li>"+
      "</ul>"
    );
  };

  Cardapio.applyBindings = function() {
    viewModel.cardapios = cardapios;
    ko.applyBindings(viewModel);
  };

  // Routes
  !function () {
    Path.map("#/cardapio/hamburguer").to(function(){
      head.js("javascripts/_cardapio_hamburguer.js", function(){
        Lanche.Cardapio.Hamburguer.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.listen();
  }();
  
})(window, Zepto, ko, Lanche.viewModel);

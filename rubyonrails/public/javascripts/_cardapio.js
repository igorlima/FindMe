;(function(Lanche, $, ko, viewModel) {
  var cardapios = null;

  var Cardapio = Lanche.Cardapio = function(){};
  Cardapio.load = function() {
    viewModel.title('Cardápio');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showHomeContent(false);
    viewModel.showMap(false);

    if (!cardapios) {
      loadCardapioFromServer();
    } else {  
      createHtml();
      applyBindings();
    }

    if (cardapios) 
      Lanche.spinner.stop();
    
  };

  var loadCardapioFromServer = function() {
    $.getJSON('/cardapios.json', function(data) {
      cardapios = data;
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
        "<p class='welcome'>Aprecie nosso cardárpio.</p>"+
      "</div>"
    )
    .append(""+
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

  var applyBindings = function() {
    viewModel.cardapios = cardapios;
    ko.applyBindings(viewModel);
  };

  // Routes
  !function () {
    Path.map("#cardapio/hamburguer").to(function(){
      Lanche.spinner.start();
      head
      .js("javascripts/lawnchair-0.6.1.min.js")
      .js("javascripts/_cardapio_hamburguer.js")
      .ready(function(){
        Cardapio.Hamburguer.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.listen();
  }();
  
})(window.Lanche, Zepto, ko, Lanche.viewModel);

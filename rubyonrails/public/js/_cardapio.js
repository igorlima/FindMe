;(function(window, $, ko, viewModel, P) {
  var Lanche = window.Lanche;
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
          "<a data-bind='attr: { href: c.url }, click: function(c, event){ $root.selecionarCardapio(c, event) } '>"+
            "<strong data-bind='text: c.description'></strong>"+
            "<span class='chevron'></span>"+
          "</a>"+
        "</li>"+
      "</ul>"
    );
  };

  var applyBindings = function() {
    viewModel.cardapios = cardapios;
    viewModel.selecionarCardapio = function(c, event) {
      viewModel.cardapio(c);
      window.location.href = event.currentTarget.href;
    };
    ko.applyBindings(viewModel);
  };

  // Routes
  !function () {
    P.map("#cardapio/conteudo").to(function(){
      Lanche.spinner.start();
      head
      .js(
        "js/jaylist.min.js",
        "js/_cardapio_conteudo.js",
        "js/_pedido.js",
        function() {
          Cardapio.Item.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    P.listen();
  }();

  // Observable
  !function () {
    viewModel.cardapio = ko.observable(null);
  }();
  
})(window, Zepto, ko, Lanche.viewModel, Path);

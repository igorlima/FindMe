;(function(window, $, ko, viewModel, P) {
  var Lanche = window.Lanche;
  var cardapios = null;

  var Cardapio = Lanche.Cardapio = function(){};
  Cardapio.load = function() {
    viewModel.title('Cardápio');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showMap(false);

    if (!cardapios) 
      loadCardapioFromServer();
    else 
      createHtml();
    
  };

  var loadCardapioFromServer = function() {
    $.getJSON('/cardapios.json', function(data) {
      cardapios = data;
      createHtml();
    });
  };

  var createHtml = function() {
    $('#phone-app').load( 'partials/cardapio.html', function(){
      applyBindings();
      Lanche.spinner.stop();
    });
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

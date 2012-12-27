;(function(window, $, ko, vm, P) {
  var Lanche = window.Lanche;
  var cardapios = null;

  var Cardapio = Lanche.Cardapio = function(){};
  Cardapio.load = function() {
    vm.title('Cardápio');
    vm.url_voltar('#home');
    vm.showBtnVoltar(true);
    vm.showMap(false);

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
    vm.cardapios = cardapios;
    vm.selecionarCardapio = function(c, event) {
      vm.cardapio(c);
      window.location.href = event.currentTarget.href;
    };
    ko.applyBindings(vm);
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
    vm.cardapio = ko.observable(null);
  }();
  
})(window, Zepto, ko, Lanche.viewModel, Path);

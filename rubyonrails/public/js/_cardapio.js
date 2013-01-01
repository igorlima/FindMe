;(function(window, $, ko, vm, P) {
  var Lanche = window.Lanche;

  var Cardapio = Lanche.Cardapio = function(){};
  Cardapio.data = null;

  Cardapio.load = function() {
    vm.title('Cardápio');
    vm.url_voltar('#home');
    vm.showBtnVoltar(true);
    vm.showMap(false);

    if (!Cardapio.data) 
      loadCardapioFromServer();
    else 
      createHtml();
    
  };

  var loadCardapioFromServer = function() {
    $.getJSON('/cardapios.json', function(data) {
      Cardapio.data = data;
      Lanche.storage.save({key: 'cardapios', data: data});
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
    vm.cardapios = Cardapio.data;
    vm.selecionarCardapio = function(c, event) {
      vm.cardapio(c);
      window.location.href = event.currentTarget.href;
    };
    ko.applyBindings(vm);
  };

  // Routes
  !function () {
    P.map('#cardapio/conteudo').to(function(){
      Lanche.spinner.start();
      head
      .js(
        'js/lawnchair-0.6.1.min.js',
        'js/jaylist.min.js',
        'js/_pedido'+Lanche.minify+'.js',
        'js/_cardapio_conteudo'+Lanche.minify+'.js',
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

  //Local Storage
  !function () {
    Lanche.storage = new Lawnchair( function(storage) {
      storage.get('cardapios', function(cardapios) {
        cardapios && (Lanche.Cardapio.data = cardapios.data);
      });
    });
  }();
  
})(window, Zepto, ko, Lanche.viewModel, Path);

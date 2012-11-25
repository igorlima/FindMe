;(function(window, $){
  var viewModel = Lanche.viewModel;

  var Cardapio = window.Lanche.Cardapio = function(){};
  Cardapio.load = function() {
    viewModel.title('Cardápio');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showHomeContent(false);
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
  
})(window, Zepto);

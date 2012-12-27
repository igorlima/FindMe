;(function(Lanche, Finger, $, ko, viewModel) {

  var Promocao = Lanche.Promocao = function(){};
  Promocao.load = function() {
    viewModel.title('Cardápio');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showMap(false);

    Lanche.spinner.start();
    $('#phone-app').load( 'partials/promocao.html', function(){
      applyBindings();
      Lanche.spinner.stop();
    });
  
  };

  var applyBindings = function() {
    ko.applyBindings(viewModel);
  };
  
})(window.Lanche, FingerBlast, Zepto, ko, Lanche.viewModel);

;(function(Lanche, Finger, $, ko, viewModel) {

  var Promocao = Lanche.Promocao = function(){};
  Promocao.load = function() {
    viewModel.title('Promoções');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showMap(false);

    Lanche.spinner.start();
    $('#phone-app').load( 'partials/promocao.html', function(){
      new FingerBlast( $('.slider')[0] );
      Lanche.Slider.scan();
      applyBindings();
      Lanche.spinner.stop();
    });
  
  };

  var applyBindings = function() {
    ko.applyBindings(viewModel);
  };
  
  //Local Storage
  !function () {
    Lanche.storage = new Lawnchair( function(storage) {
      
    });
  }();

})(window.Lanche, FingerBlast, Zepto, ko, Lanche.viewModel);

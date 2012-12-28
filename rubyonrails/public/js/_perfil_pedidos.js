;(function(Perfil, $, vm) {

  var Ordens = Perfil.Ordens = Lanche.Ordens || function() {};
  Ordens.load = function() {
    vm.title('Meus Pedidos');
    vm.url_voltar('#perfil');
    vm.showBtnVoltar(true);
    vm.showMap(false);

    Lanche.spinner.start();
    $('#phone-app').load( 'partials/perfil_ordens.html', function(){
      applyBindings();
      Lanche.spinner.stop();
    });

  };

  var applyBindings = function() {
    ko.applyBindings(vm);
  };
  
})(window.Lanche.Perfil, Zepto, Lanche.viewModel);

;(function(Lanche, $, vm) {

  var Perfil = Lanche.Perfil = Lanche.Perfil || function() {};
  Perfil.load = function() {
    vm.title('Usuário');
    vm.url_voltar('#home');
    vm.showBtnVoltar(false);
    vm.showMap(false);

    Lanche.spinner.start();
    $('#phone-app').load( 'partials/perfil.html', function(){
      applyBindings();
      Lanche.spinner.stop();
    });

  };

  var applyBindings = function() {
    vm.imagePerfil = ko.observable( Lanche.User.data.image );
    vm.userNamePerfil = ko.observable( Lanche.User.data.name );
    ko.applyBindings(vm);
  };
  
})(window.Lanche, Zepto, Lanche.viewModel);

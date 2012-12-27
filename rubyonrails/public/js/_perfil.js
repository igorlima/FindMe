;(function(Lanche, $, vm) {

  var User = Lanche.User = Lanche.User || function() {};
  User.load = function() {
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
    vm.imagePerfil = ko.observable( User.data.image );
    vm.userNamePerfil = ko.observable( User.data.name );
    ko.applyBindings(vm);
  };
  
})(window.Lanche, Zepto, Lanche.viewModel);

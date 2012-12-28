;(function(Lanche, $, vm, P) {

  var Perfil = Lanche.Perfil = Lanche.Perfil || function() {};
  Perfil.load = function() {
    vm.title('Usuário');
    vm.url_voltar('#home');
    vm.showBtnVoltar(true);
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

  // Routes
  !function () {
    P.map("#perfil/pedidos").to(function(){
      Lanche.spinner.start();
      head
      .js(
        "js/_perfil_pedidos.js",
        function() {
          Perfil.Ordens.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    P.map("#perfil/mensagens").to(function(){
      Lanche.spinner.start();
      head
      .js(
        "js/_perfil_mensagens.js",
        function() {
          Perfil.Mensagens.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    P.listen();
  }();
  
})(window.Lanche, Zepto, Lanche.viewModel, Path);

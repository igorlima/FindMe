;(function(Perfil, $, ko, vm) {

  var Msg = Perfil.Mensagens = Lanche.Mensagens || function() {};
  Msg.load = function() {
    vm.title('Minhas Menagens');
    vm.url_voltar('#perfil');
    vm.showBtnVoltar(true);
    vm.showMap(false);

    Lanche.spinner.start();
    $.getJSON('/user/lastMessages.json', function(data) {
      vm.mensagens(data);
      $('#phone-app').load( 'partials/perfil_mensagens.html', function(){
        applyBindings();
        Lanche.spinner.stop();
      });
    });

  };

  var applyBindings = function() { 
    var hasMensagens = vm.mensagens() ? vm.mensagens().length > 0 : false;
    vm.hasMensagens = ko.observable( hasMensagens );
    ko.applyBindings(vm);
  };

  // Observable
  !function () {
    vm.mensagens = ko.observable(null);
  }();
  
})(window.Lanche.Perfil, Zepto, ko, Lanche.viewModel);
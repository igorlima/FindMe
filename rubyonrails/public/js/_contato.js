;(function(Lanche, $, vm) {

  var Contato = Lanche.Contato = function(){};
  Contato.load = function() {
    vm.title('Contato');
    vm.url_voltar('#home');
    vm.showBtnVoltar(false);
    vm.showMap(false);

    $('#phone-app').load( 'partials/contato.html', function() {
      applyBindings();
      Lanche.spinner.stop();
    });
  };

  var applyBindings = function() {
    vm.contato = ko.observable({
      name: Lanche.User.data.name
    });
    vm.sendMessage = function() {
      Lanche.spinner.start();
      $.post('/messages.json', {
          message: vm.contato(),
          authenticity_token: Lanche.User.data.authenticity_token
        },
        function(response) {
          response = JSON.parse(response);
          var message_errors = Lanche.Util.message_errors(response.errors);
          if (message_errors) alert(message_errors);
          else vm.contato({});
          Lanche.spinner.stop();
        }
      );
    };

    ko.applyBindings(vm);
  };
  
})(window.Lanche, Zepto, Lanche.viewModel);

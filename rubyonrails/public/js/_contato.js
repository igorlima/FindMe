;(function(Lanche, $, viewModel) {

  var Contato = Lanche.Contato = function(){};
  Contato.load = function() {
    viewModel.title('Contato');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(false);
    viewModel.showHomeContent(false);
    viewModel.showMap(false);

    createHtml();
    applyBindings();
    Lanche.spinner.stop();
  };

  var createHtml = function() {
    $('#phone-app')
    .empty()
    .append(""+
      "<div class='content-padded'>"+
        "<p class='welcome'>Estamos abertos a qualquer tipo de sugestão e críticas.</p>"+
      "</div>"
    )
    .append(""+
      "<form class='contato'>"+
        "<div class='input-group'>"+
          "<div class='input-row'>"+
            "<label>Nome</label>"+
            "<input type='text' placeholder='Igor Ribeiro Lima' data-bind='value: contato().name' >"+
          "</div>"+
          "<div class='input-row'>"+
            "<label>Telefone</label>"+
            "<input type='text' placeholder='(35) 9961-3395' data-bind='value: contato().phone' >"+
          "</div>"+
          "<div class='input-row'>"+
            "<label>E-mail</label>"+
            "<input type='email' placeholder='team@evolut.io' data-bind='value: contato().email' >"+
          "</div>"+
        "</div>"+
        "<input type='search' placeholder='Assunto' data-bind='value: contato().subject' >"+
        "<textarea rows='5' data-bind='value: contato().text' ></textarea>"+
        "<a class='button button-block'>Enviar</a>"+
      "</form>"
    );

    $('#phone-app form a.button').click(function() {
      Lanche.spinner.start();
      $.post('/messages.json', {
          message: viewModel.contato(),
          authenticity_token: Lanche.User.data.authenticity_token
        },
        function(response) {
          viewModel.contato({});
          Lanche.spinner.stop();
        }
      );
    });
  };

  var applyBindings = function() {
    viewModel.contato = ko.observable({});
    ko.applyBindings(viewModel);
  };
  
})(window.Lanche, Zepto, Lanche.viewModel);

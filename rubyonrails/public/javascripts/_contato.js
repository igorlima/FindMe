;(function(Lanche, $, viewModel) {

  var Contato = Lanche.Contato = function(){};
  Contato.load = function() {
    viewModel.title('Contato');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(false);
    viewModel.showHomeContent(false);
    viewModel.showMap(false);

    createHtml();
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
            "<input type='text' placeholder='Igor Ribeiro Lima'>"+
          "</div>"+
          "<div class='input-row'>"+
            "<label>Telefone</label>"+
            "<input type='text' placeholder='(35) 9961-3395'>"+
          "</div>"+
          "<div class='input-row'>"+
            "<label>E-mail</label>"+
            "<input type='email' placeholder='team@evolut.io'>"+
          "</div>"+
        "</div>"+
        "<input type='search' placeholder='Assunto'>"+
        "<textarea rows='5'></textarea>"+
        "<a class='button button-block'>Enviar</a>"+
      "</form"
    );
  };
  
})(window.Lanche, Zepto, Lanche.viewModel);

;(function(Lanche, $, viewModel) {

  var User = Lanche.User = Lanche.User || function() {};
  User.load = function() {
    viewModel.title('Usuário');
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
        "<img src='"+ User.data.image +"' >"+
        "<br>"+
        "<p class='welcome'>Você está logado como "+ User.data.name +".</p>"+
      "</div>"
    );
  };
  
})(window.Lanche, Zepto, Lanche.viewModel);

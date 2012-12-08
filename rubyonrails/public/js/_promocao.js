;(function(Lanche, Finger, $, ko, viewModel) {

  var Promocao = Lanche.Promocao = function(){};
  Promocao.load = function() {
    viewModel.title('Cardápio');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
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
        "<p class='welcome'>Nós nos orgulhamos de poder lhe oferecer ótimos produtos com ótimos preços.</p>"+
      "</div>"
    )
    .append(""+
      "<div class='slider'>"+
        "<ul>"+
          "<li>"+
            "<img src='img/promocao-1.jpg'>"+
            "<span class='slide-text'><strong>← Arraste e se surpreenda</strong></span>"+
          "</li>"+
          "<li>"+
            "<img src='img/promocao-2.jpg'>"+
          "</li>"+
          "<li>"+
            "<img src='img/promocao-3.jpg'>"+
          "</li>"+
        "</ul>"+
      "</div>"
    )
    .append(""+
      "<ul class='list inset'>"+
        "<li>X-Tudinho <a class='button-positive'>Comprar</a></li>"+
        "<li>X-Picanha <a class='button-positive'>Comprar</a></li>"+
        "<li>Lombo-Bacon-Egg <a class='button-positive'>Comprar</a></li>"+
        "<li>Misto <a class='button-positive'>Comprar</a></li>"+
      "</ul>"
    );

    Lanche.Slider.scan();
    new Finger( $('.slider')[0] );
  };

  var applyBindings = function() {
    ko.applyBindings(viewModel);
  };
  
})(window.Lanche, FingerBlast, Zepto, ko, Lanche.viewModel);

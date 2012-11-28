;(function(Lanche, $, ko, view) {
  
  var Pedido = Lanche.Pedido = function() {};

  Pedido.load = function() {
    popover();
    Lanche.spinner.stop();
  };

  var popover = function() {
    $('.popover')
    .on('tap', keepOpen)
    .on('click', keepOpen)
    .css('display', 'block')
    ;

    $('html')
    .on('tap', close)
    .on('click', close);
  };

  var close = function(e) {
    $('.popover')
    .off('tap', keepOpen)
    .off('click', keepOpen)
    .css('display', 'none')
    ;

    $('html')
    .off('tap', close)
    .off('click', close);

  };

  var keepOpen = function(e) {
    e.stopPropagation();
  };

  var createHtml = function() {
    $('.popover')
    .append(""+
      "<header class='popover-header'>"+
        "<a class='button' href='#''>"+
          "Esvaziar"+
        "</a>"+
        "<h3 class='title'>Meu Pedido</h3>"+
        "<a class='button' href='#'>"+
          "Comprar"+
        "</a>"+
      "</header>"
    )
    .append(""+
      "<ul class='list'>"+
        "<li>"+
          "Item1"+
          "<span class='count-main'>4</span>"+
        "</li>"+
        "<li>"+
          "Item2"+
          "<span class='count-main'>1</span>"+
        "</li>"+
        "<li>"+
          "Item3"+
          "<span class='count-main'>3</span>"+
        "</li>"+
        "<li>"+
          "Item4"+
          "<span class='count-main'>2</span>"+
        "</li>"+
      "</ul>"
    )
    .append(""+
      "<ul class='list inset'>"+
        "<li>"+
          "<strong>Total</strong>"+
          "<strong class='total'> R$ 46.80</strong>"+
        "</li>"+
      "</ul>"
    );
  };

  var applyBindings = function() {
    ko.applyBindingsToDescendants(view, $('.popover'));
  };

  // Inicializacao
  !function () {
    createHtml();
    applyBindings();
  }();

})(window.Lanche, Zepto, ko, Lanche.viewModel);
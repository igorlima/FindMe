;(function(Lanche, $, ko, viewModel) {

  var Util = Lanche.Util = function() {};
  Util.url = function(event) {
    return event.detail.state.url;
  };
  Util.page = function(event) {
    var url = Util.url(event);
    return url.match("[a-zA-Z_0-9]+[.]html")[0].replace(".html", "");
  };
  Util.clearPanel = function(){
    // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
  };

  var Index = Lanche.Index = function() {};
  Index.load = function() {
    viewModel.title('Lanche Online');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(false);
    viewModel.showHomeContent(true);
    viewModel.showMap(false);

    Lanche.spinner.stop();
  };

  //ViewModel
  !function () {
    viewModel.title = ko.observable('Lanche Online');
    viewModel.url_voltar = ko.observable('#home');
    viewModel.showBtnVoltar = ko.observable(false);
    viewModel.showHomeContent = ko.observable(false);
    viewModel.showMap = ko.observable(false);
    ko.applyBindings(viewModel);
  }();
  
  // Routes
  !function () {
    Path.map("#pedido").to(function() {
      Lanche.spinner.start();
      $(".bar-tab .tab-item a[href='#pedido']")
      .attr('href', '#')
      .on('tap', function(e) { e.stopPropagation(); Lanche.Pedido.load(); })
      .on('click', function(e) { e.stopPropagation(); Lanche.Pedido.load(); });
      head
      .js("js/_pedido.js")
      .ready( function() {
        Lanche.Pedido.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.map("#contato").to(function(){
      Lanche.spinner.start();
      head.js("js/_contato.js", function() {
        Lanche.Contato.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.map("#promocoes").to(function(){
      Lanche.spinner.start();
      head
      .js("js/ratchet-slider.js")
      .js("js/fingerblast.js")
      .js("js/_promocao.js")
      .ready( function() {
        Lanche.Promocao.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.map("#cardapio").to(function(){
      Lanche.spinner.start();
      head
      .js("js/lawnchair-0.6.1.min.js")
      .js("js/_cardapio.js")
      .ready( function() {
        Lanche.Cardapio.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.map("#map").to(function(){
      Lanche.spinner.start();
      head
      .js("js/leaflet.min.js")
      .js("js/_map.js")
      .js("js/_local.js")
      .js("js/_localInfo.js")
      .ready(function() {
        Lanche.Map.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.listen();
  }();
  
})(window.Lanche, Zepto, ko, Lanche.viewModel);

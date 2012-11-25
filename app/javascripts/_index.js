;(function(Lanche, ko, viewModel) {

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
  };

  //ViewModel
  !function () {
    viewModel.title = ko.observable();
    viewModel.url_voltar = ko.observable();
    viewModel.showBtnVoltar = ko.observable();
    viewModel.showHomeContent = ko.observable();
    ko.applyBindings(viewModel);
  }();
  
  // Routes
  !function () {
    Path.map("#cardapio").to(function(){
      head.js("javascripts/_cardapio.js", function() {
        Lanche.Cardapio.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.map("#map").to(function(){
      head
      .load("stylesheets/leaflet.min.css")
      .js("javascripts/leaflet.min.js")
      .js("javascripts/_map.js")
      .js("javascripts/_local.js")
      .ready(function() {
        Lanche.Map.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.listen();
  }();
  
})(window.Lanche, ko, Lanche.viewModel);

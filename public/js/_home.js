;(function(Lanche, $, ko, viewModel) {

  var Util = Lanche.Util = function() {};
  Util.url = function(event) {
    return event.detail.state.url;
  };
  Util.page = function(event) {
    var url = Util.url(event);
    return url.match('[a-zA-Z_0-9]+[.]html')[0].replace('.html', '');
  };
  Util.message_errors = function(errors) {
    var message = null;
    if (!errors) return message;

    for( var error in errors ) {
      errors[error] && errors[error].forEach( function(msg) {
        if (message) message += '\n' + msg;
        else message = msg;
      });
    }
    return message;
  };
  Util.clearPanel = function(){
    // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
  };

  var Index = Lanche.Index = function() {};
  Index.load = function() {
    Lanche.spinner.start();
    $('#phone-app').load('partials/home.html', function() {
      Lanche.User.load();
      applyBindings();
      Lanche.spinner.stop();
    });
  };

  var applyBindings = function() {
    viewModel.title = ko.observable('Lanche Online');
    viewModel.url_voltar = ko.observable('#home');
    viewModel.showBtnVoltar = ko.observable(false);
    viewModel.showMap = ko.observable(false);
    ko.applyBindings(viewModel);
  };
  
  // Routes
  !function () {
    Path.map('#pedido').to(function() {
      Lanche.spinner.start();
      $(".bar-tab .tab-item a[href='#pedido']")
      .attr('href', '#')
      .on('tap', function(e) { e.stopPropagation(); Lanche.Pedido.load(); })
      .on('click', function(e) { e.stopPropagation(); Lanche.Pedido.load(); });
      head
      .js(
        'js/lawnchair-0.6.1.min.js',
        'js/jaylist.min.js',
        'js/_pedido'+Lanche.minify+'.js',
        'js/_cardapio'+Lanche.minify+'.js',
        'js/_cardapio_conteudo'+Lanche.minify+'.js',
        function() {
          Lanche.Pedido.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    Path.map('#perfil').to(function() {
      Lanche.spinner.start();
      head
      .js(
        'js/_perfil'+Lanche.minify+'.js',
        function() {
          Lanche.Perfil.load();
        }
      );
    });

    Path.map('#contato').to(function(){
      Lanche.spinner.start();
      head.js(
        'js/_contato'+Lanche.minify+'.js', 
        function() {
          Lanche.Contato.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    Path.map('#promocoes').to(function(){
      Lanche.spinner.start();
      head
      .js(
        'js/lawnchair-0.6.1.min.js',
        'js/ratchet-slider.min.js',
        'js/fingerblast.min.js',
        'js/_promocao'+Lanche.minify+'.js',
        function() {
          Lanche.Promocao.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    Path.map('#cardapio').to(function(){
      Lanche.spinner.start();
      head
      .js(
        'js/lawnchair-0.6.1.min.js',
        'js/_cardapio'+Lanche.minify+'.js',
        function() {
          Lanche.Cardapio.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    Path.map('#map').to(function(){
      Lanche.spinner.start();
      head
      .js(
        'js/leaflet.min.js',
        'js/_map'+Lanche.minify+'.js',
        'js/_local'+Lanche.minify+'.js',
        'js/_localInfo'+Lanche.minify+'.js',
        function() {
          Lanche.Map.load();
        }
      );
    }).enter(Lanche.Util.clearPanel);

    Path.listen();
  }();
  
})(window.Lanche, Zepto, ko, Lanche.viewModel);

;(function(Lanche, $, ko, Leaflet, viewModel) {

  var Map = Lanche.Map = function() {};
  Map.load = function() {
    viewModel.title('Rastrear minha compra');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showHomeContent(false);

    createHtml();
    applyBindings();
  };

  var createHtml = function() {
    $('#phone-app').empty();
    var map = Map.map;
    if (!map) {
      map = Map.map = Leaflet.map('map', {
        zoomControl: false, //removendo controle de zoom
        attributionControl: false //removendo informações do Leaflet
      });

      Leaflet.control.zoom({
        position: 'bottomright' //adicionando o controle de zoom na parte inferior direita do mapa
      }).addTo(map);
      
      // add a CloudMade tile layer
      Leaflet.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
          key: '4545df0a35ca4aa1bbf2afaab46c68e0',
          attribution: '',
          maxZoom: 18,
          styleId: 997
      }).addTo(map);
    };

  };

  var applyBindings = function() {
    
  };

})(window.Lanche, Zepto, ko, L, Lanche.viewModel);

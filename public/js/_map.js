;(function(Lanche, $, ko, Leaflet, viewModel) {

  var Map = Lanche.Map = function() {};
  Map.load = function() {
    viewModel.title('Mapa');
    viewModel.url_voltar('#home');
    viewModel.showBtnVoltar(true);
    viewModel.showMap(true);

    createHtml();
    applyBindings();
    Lanche.spinner.stop();
  };

  var createHtml = function() {
    $('#phone-app').empty();
  };

  var applyBindings = function() {
    ko.applyBindings(viewModel);
  };

  // Criando Mapa
  !function() {
    var map = Map.map = Leaflet.map('map', {
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

    /************
    * Localização
    *************/
    map.on('locationfound', function(e){
      var radius = e.accuracy / 2;

      //Adicionando um Marker com a localização
      L.marker(e.latlng)
      .addTo(map)
      .bindPopup('Você está em um raio de ' + radius + ' metros desse ponto')
      .openPopup()
      .on('click', function(e){
        var latlng = e.target.getLatLng();
        console.log(latlng.toLocaleString());
      });

      L.circle(e.latlng, radius) //criando raio de localização
      .addTo(map) //Adicionando o raio de localizacao
      .bringToBack(); //movendo o raio de localização para ficar atrás da camada de Locais
      map.setView(e.latlng, 15); //alterando view no mapa
    });

    map.on('locationerror', function onLocationError(e) {
      L.marker([-21.244722,-45.000429])
      .addTo(map)
      .bindPopup('Nossa loja')
      .openPopup();

      map.setView([-21.244722,-45.000429], 15);
      console.warn(e.message);
    });

    map.locate({setView: true, maxZoom: 18});
    /************
    * FIM Localização
    *************/

  }();

})(window.Lanche, Zepto, ko, L, Lanche.viewModel);

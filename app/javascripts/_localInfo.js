;(function(Map, L){

  var Info = Map.Local.Info = function() {
  };
  Info.control = L.control({position: 'bottomleft'});
  var container;

  // CRIACAO DO CONTAINER DO CONTROLE
  !function() {
    container = $("<div class='leaflet-control-layers leaflet-control'/>");
    container.on('tap', function() {
      container.addClass('leaflet-control-layers-expanded');
    });
    Map.map.on('tap', function() {
      container.removeClass('leaflet-control-layers-expanded');
    });
    container.on('mouseover', function() {
      container.addClass('leaflet-control-layers-expanded');
    });
    container.on('mouseout', function() {
      container.removeClass('leaflet-control-layers-expanded');
    });

    container.append("<a class='leaflet-control-layers-toggle' href='#' title='Layers'></a>");
    container.append("<form class='leaflet-control-layers-list'/>");

    Info.control.onAdd = function(map) {
      return container[0];
    };
  }();

  // CRIACAO DO CONTEUDO DE DENTRO DO CONTAINER
  !function() {
    var form = container.find('form');
    var ul = $('<ul/>');
    Map.Local.datas.forEach(function(data){
      var nameLocal = data.geoJson.properties.name;
      var coord = data.geoJson.geometry.coordinates;
      var latlng =  data.geoJson.geometry.type == 'Point' ?
                    new L.LatLng( coord[1], coord[0] ) :
                    data.layer.getBounds().getCenter();
      var popup = L.popup()
      .setLatLng(latlng)
      .setContent(data.geoJson.properties.popupContent);

      form.append( 
        $('<li/>')
        .attr('href', '#')
        .html(nameLocal)
        .css('cursor', 'pointer')
        .css('padding', '2px 0px')
        .on('click', function(event) {
          event.stopPropagation();
          popup.openOn(Map.map);
          Map.map.setView(latlng, 16);
        })
      );
    });
    form.append(ul);
  }();


  Info.control.addTo(Map.map);

})(window.Lanche.Map, L);

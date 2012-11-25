;(function(Map, Leaflet) {

  var Local = Map.Local = function(geoJson) {
    this.geoJson = geoJson;
  };
  Local.fn = Local.prototype;

  var layer = Leaflet.geoJson().addTo(Map.map);

  var styleFeaturePoint = {
    "color": "#dd0000",
    "weight": 4,
    "opacity": 0.80
  };

  var styleFeaturePolygon = {
    "color": "#f000ff",
    "weight": 1,
    "opacity": 0.99
  };

  var stylePoint = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  Local.fn.addToMap = function () {
    Leaflet.geoJson(this.geoJson, {
      style: function(feature) {
        switch (feature.geometry.type) {
          case 'Point':    return styleFeaturePoint;
          case 'Polygon': return styleFeaturePolygon;
        }
      },
      pointToLayer: function (feature, latlng) {
        return Leaflet.circleMarker (latlng, stylePoint); //alteração para que o ponto seja um círculo
      },
      onEachFeature: function (feature, layer) {
        //adicionando popup a cada ponto
        if (feature.properties && feature.properties.popupContent)
          layer.bindPopup(feature.properties.popupContent);
      },
      filter: function(feature, layer) {
        //utilizando filtro para alterar a visibilidade do ponto no mapa
        return feature.properties.show_on_map;
      }
    }).addTo(Map.map);
    return Local;
  };

  Local.addToMap = function (geoJson) {
    return new Local(geoJson).addToMap();
  };

  Local.evolutio = {
    "type": "Feature",
    "properties": {
      "name": "Evolutio",
      "popupContent": "Aqui é a Evolutio.",
      "show_on_map": true
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-44.989073, -21.251152]
    }
  };

  Local.shopping = {
    "type": "Feature",
    "properties": {
      "name": "Lavras Shopping",
      "popupContent": "Aqui é o shopping de Lavras.",
      "show_on_map": true
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-44.990285, -21.248087]
    }
  };

  Local.casaDoBahia = {
    "type": "Feature",
    "properties": {
      "name": "Residência do Igor (Baiano)",
      "popupContent": "Aqui é a residência do senhor Baiano.",
      "show_on_map": true
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-44.991186, -21.247572]
    }
  };

  Local.casaDaGleyce = {
    "type": "Feature",
    "properties": {
      "name": "Residência da Gleycia",
      "popupContent": "Aqui é a residência da querida Gleycinha.",
      "show_on_map": true
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-44.987082, -21.236952]
    }
  };

  Local.lemaf = {
    "type": "Feature",
    "properties": {
      "name": "Leboratório de projetos em manejos florestais",
      "popupContent": "Aqui é o Lemaf do DCF/UFLA.",
      "show_on_map": true
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-44.974208, -21.226194]
    }
  };

  Local.ufla = {
    "type": "Feature",
    "properties": {
      "name": "UFLA",
      "popupContent": "Área total da UFLA.",
      "show_on_map": true
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [-44.994228, -21.231367],
        [-44.994614, -21.231737],
        [-44.994748, -21.232297],
        [-44.994169, -21.232542],
        [-44.993815, -21.233067],
        [-44.993370, -21.233667],
        [-44.992543, -21.233997],
        [-44.991299, -21.234507],
        [-44.991154, -21.234902],
        [-44.990172, -21.235057],
        [-44.989824, -21.234982],
        [-44.989373, -21.233787],
        [-44.989083, -21.232707],
        [-44.989201, -21.231862],
        [-44.988617, -21.231767],
        [-44.983757, -21.233512],
        [-44.978145, -21.235942],
        [-44.976676, -21.237382],
        [-44.974905, -21.238772],
        [-44.971429, -21.243422],
        [-44.970539, -21.242722],
        [-44.967642, -21.243202],
        [-44.960518, -21.232562],
        [-44.959574, -21.222921],
        [-44.961956, -21.220821],
        [-44.973071, -21.217941],
        [-44.973843, -21.218521],
        [-44.974465, -21.219921],
        [-44.974465, -21.219921],
        [-44.976568, -21.223521],
        [-44.980280, -21.222181],
        [-44.984872, -21.223441],
        [-44.987619, -21.225282],
        [-44.989872, -21.227142],
        [-44.990237, -21.227942],
        [-44.992554, -21.229362],
        [-44.993370, -21.230302],
        [-44.994003, -21.230912]
      ]]
    }
  };

  !function() {
    /************
    * Adicionando locais no mapa
    *************/
    Local
    .addToMap(Local.ufla)
    .addToMap(Local.evolutio)
    .addToMap(Local.shopping)
    .addToMap(Local.casaDoBahia)
    .addToMap(Local.casaDaGleyce)
    .addToMap(Local.lemaf);
    /************
    * FIM da adição dos locais no mapa
    *************/
  }();
  
})(window.Lanche.Map, L);

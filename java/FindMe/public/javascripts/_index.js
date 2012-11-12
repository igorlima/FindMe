;(function(window){
  var Lanche = window.Lanche = function() {};
  var Util = Lanche.Util = function() {};
  Util.url = function(event) {
    return event.detail.state.url;
  }
  Util.page = function(event) {
    var url = Util.url(event);
    return url.match("[a-zA-Z_0-9]+[.]html")[0].replace(".html", "");
  }
  var Index = Lanche.Index = function() {};
  Index.load = function() {
    
  };
  
  window.addEventListener('push', function(event){
    var page = Lanche.Util.page(event);
    if (page=="cardapio") 
      head.js("javascripts/_cardapio.js", function(){
        Lanche.Cardapio.load();
      });
  });
})(window);

;(function(window, $){
  var Cardapio = window.Lanche.Cardapio = function(){};
  Cardapio.load = function() {
    
  };
  
  window.addEventListener('push', function(event){
    var page = Lanche.Util.page(event);
    if (page=="cardapio_hamburguer") 
      head.js("javascripts/_cardapio_hamburguer.js", function(){
        Lanche.Cardapio.Hamburguer.load();
      });
  });
})(window, Zepto);

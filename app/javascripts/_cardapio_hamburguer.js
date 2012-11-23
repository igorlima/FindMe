;(function(window, $){
  var Hamburguer = window.Lanche.Cardapio.Hamburguer = function(){};
  Hamburguer.load = function() {
    $('.button-positive').on('tap',function(){
      alert('Compra efetuada com sucesso.');
    });
  };
})(window, Zepto);

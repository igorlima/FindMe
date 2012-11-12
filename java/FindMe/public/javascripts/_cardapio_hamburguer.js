;(function(window, $){
  var Hamburguer = window.Lanche.Cardapio.Hamburguer = function(){};
  Hamburguer.load = function() {
    $('.button-positive').click(function(){
      alert('Compra efetuada com sucesso.');
    });
  };
})(window, Zepto);

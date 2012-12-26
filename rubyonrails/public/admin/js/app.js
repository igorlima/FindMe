'use strict';


// Declare app level module which depends on filters, and services
var lancheOnlineApp = 
angular
.module('lancheOnlineApp', ['lancheOnlineApp.filters', 'cardapioModel', 'cardapioItemModel', 'mensagemModel', 'lancheOnlineApp.directives'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/pedidos', {templateUrl: 'partials/pedidos.html', controller: 'PedidosCtrl'});
  $routeProvider.when('/cardapios', {templateUrl: 'partials/cardapios.html', controller: 'CardapiosCtrl'});
  $routeProvider.when('/cardapios-novo', {templateUrl: 'partials/cardapios-novo.html', controller: 'CardapiosNovoCtrl'});
  $routeProvider.when('/cardapios-visualizacao', {templateUrl: 'partials/cardapios-visualizacao.html', controller: 'CardapiosVisualizacaoCtrl'});
  $routeProvider.when('/cardapios-edicao', {templateUrl: 'partials/cardapios-edicao.html', controller: 'CardapiosEdicaoCtrl'});
  $routeProvider.when('/cardapios-itens', {templateUrl: 'partials/cardapios-itens.html', controller: 'CardapiosItensCtrl'});
  $routeProvider.when('/cardapios-itens-novo', {templateUrl: 'partials/cardapios-itens-novo.html', controller: 'CardapiosItensNovoCtrl'});
  $routeProvider.when('/cardapios-itens-visualizacao', {templateUrl: 'partials/cardapios-itens-visualizacao.html', controller: 'CardapiosItensVisualizacaoCtrl'});
  $routeProvider.when('/cardapios-itens-edicao', {templateUrl: 'partials/cardapios-itens-edicao.html', controller: 'CardapiosItensEdicaoCtrl'});
  $routeProvider.when('/mensagens', {templateUrl: 'partials/mensagens.html', controller: 'MensagensCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});

}])
.run(['$rootScope', 'Mensagem', function(root, Mensagem) {

  var client = new Faye.Client('http://igorribeirolima.com.br:9292/faye', {
    timeout: 120
  });

  root.mensagens = root.mensagens || [];
  root.mensagensNaoLidas = root.mensagensNaoLidas || [];
  root.listarMensagens = function() {
    root.carregandoMensagens = true;
    Mensagem.all(function(data){
      root.mensagens = data;
      root.mensagensNaoLidas = [];
      
      root.mensagens.forEach( function(mensagem) {
        mensagem.read==0 && root.mensagensNaoLidas.push(mensagem);
      });
      root.carregandoMensagens = false;
    });
  };
  root.listarMensagens();

  client.subscribe('/messages/new', function (message) {
    !root.carregandoMensagens && root.listarMensagens();
    var unique_id = $.gritter.add({
      title: message.subject, // (string | mandatory) the heading of the notification
      text: message.text, // (string | mandatory) the text inside the notification
      image: message.user.image, // (string | optional) the image to display on the left
      sticky: false, // (bool | optional) if you want it to fade out on its own or just sit there
      time: '', // (int | optional) the time you want it to be alive for before fading out
      class_name: 'my-sticky-class' // (string | optional) the class name you want to apply to that specific message
    });
  });




  client.subscribe('/payments/notification', function (notification) {
    var unique_id = $.gritter.add({
      title: 'Notificação de pagamento',
      text: 'Pagamento efetuado por ' + notification.user.name,
      image: notification.user.image,
      sticky: false,
      time: '',
      class_name: 'gritter-light'
    });
  });

}])
;

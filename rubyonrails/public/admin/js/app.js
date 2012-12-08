'use strict';


// Declare app level module which depends on filters, and services
var lancheOnlineApp = 
angular
.module('lancheOnlineApp', ['lancheOnlineApp.filters', 'cardapioModel', 'cardapioItemModel', 'lancheOnlineApp.directives'])
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
}]);

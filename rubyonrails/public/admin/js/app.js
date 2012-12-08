'use strict';


// Declare app level module which depends on filters, and services
var lancheOnlineApp = 
angular
.module('lancheOnlineApp', ['lancheOnlineApp.filters', 'cardapioMOdel', 'lancheOnlineApp.directives'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/pedidos', {templateUrl: 'partials/pedidos.html', controller: 'PedidosCtrl'});
  $routeProvider.when('/cardapios', {templateUrl: 'partials/cardapios.html', controller: 'CardapiosCtrl'});
  $routeProvider.when('/cardapios-novo', {templateUrl: 'partials/cardapios-novo.html', controller: 'CardapiosNovoCtrl'});
  $routeProvider.when('/cardapios-visualizacao', {templateUrl: 'partials/cardapios-visualizacao.html', controller: 'CardapiosVisualizacaoCtrl'});
  $routeProvider.when('/mensagens', {templateUrl: 'partials/mensagens.html', controller: 'MensagensCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

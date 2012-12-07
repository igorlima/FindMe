'use strict';


// Declare app level module which depends on filters, and services
var lanchesOnlineApp = angular.module('lanchesOnlineApp', ['lanchesOnlineApp.filters', 'lanchesOnlineApp.services', 'lanchesOnlineApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/pedidos', {templateUrl: 'partials/pedidos.html', controller: 'PedidosCtrl'});
    $routeProvider.when('/cardapios', {templateUrl: 'partials/cardapios.html', controller: 'CardapiosCtrl'});
    $routeProvider.when('/mensagens', {templateUrl: 'partials/mensagens.html', controller: 'MensagensCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);

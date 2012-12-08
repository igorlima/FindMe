'use strict';

/* Services */


angular.module('cardapioMOdel', ['ngResource']).
factory('Cardapio', ['$resource', function($resource){
  return $resource('/cardapios/:id', {}, {
    all:    {method:'GET'   , params:{}, isArray:true },
    save:   {method:'POST'  , params:{}},
    update: {method:'PUT'   , params:{}},
    get:    {method:'GET'   , params:{id:'@id'}},
    remove: {method:'DELETE', params:{id:'@id'}}
  });
}]);


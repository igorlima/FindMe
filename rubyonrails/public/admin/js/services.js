'use strict';

/* Services */


angular.module('cardapioModel', ['ngResource']).
factory('Cardapio', ['$resource', function($resource){
  return $resource('/cardapios/:id', {}, {
    all:    {method:'GET'   , params:{}, isArray:true },
    save:   {method:'POST'  , params:{}},
    update: {method:'PUT'   , params:{id:'@id'}},
    get:    {method:'GET'   , params:{id:'@id'}},
    remove: {method:'DELETE', params:{id:'@id'}}
  });
}]);

angular.module('cardapioItemModel', ['ngResource']).
factory('CardapioItem', ['$resource', function($resource){
  return $resource('/cardapio_items/:id', {}, {
    all:    {method:'GET'   , params:{}, isArray:true },
    save:   {method:'POST'  , params:{}},
    update: {method:'PUT'   , params:{id:'@id'}},
    get:    {method:'GET'   , params:{id:'@id'}},
    remove: {method:'DELETE', params:{id:'@id'}}
  });
}]);

angular.module('mensagemModel', ['ngResource']).
factory('Mensagem', ['$resource', function($resource){
  return $resource('/messages/:id/:isread', {}, {
    all:    {method:'GET'   , params:{}, isArray:true },
    save:   {method:'POST'  , params:{}},
    update: {method:'PUT'   , params:{id:'@id'}},
    get:    {method:'GET'   , params:{id:'@id'}},
    mark:   {method:'GET'   , params:{id:'@id'}},
    remove: {method:'DELETE', params:{id:'@id'}}
  });
}]);
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

angular.module('pedidoModel', ['ngResource']).
factory('Pedido', ['$resource', function($resource){
  return $resource('/orders/:id/:status', {}, {
    all:       {method:'GET' , params:{}, isArray:true },
    doing:     {method:'POST', params:{id:'@id', status: 'doing'}},
    done:      {method:'POST', params:{id:'@id', status: 'done'}},
    delivered: {method:'POST', params:{id:'@id', status: 'delivered'}}
  });
}]);

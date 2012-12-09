'use strict';

/* Controllers */
lancheOnlineApp.

controller( "MensagensCtrl", ['$rootScope', '$scope', 'Mensagem',
  function(root, ng, Mensagem) {
    !root.carregandoMensagens && root.listarMensagens();

    
    activeCurrentLink();
    widthFunctions();

  }
]);

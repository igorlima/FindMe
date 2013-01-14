;(function(window, $){

  var Lanche = window.Lanche = window.Lanche || function() {};
  var User = Lanche.User = Lanche.User || function() {};

  User.load = function() {
    $.getJSON('/user.json', function(data){
      User.data = data;
      if (data && data.uid) authenticated(data);
      else notAuthenticated(data);
    });
  };

  User.loadLastAddress = function( callback ) {
    if (!User.data) return;

    User.data.lastAddress = {};
    $.getJSON('/user/lastAddress.json', function(data) {
      User.data.lastAddress = data;
      callback(User.data.lastAddress);
    });
  };

  var authenticated = function(data) {
    var isAuthenticated = (data && data.uid);
    if (!isAuthenticated) return;

    $('#authentication a').attr('href', '/signout');
    $('#authentication strong').html('Sair');

    $('#bar-tab-item-user a').attr( 'href', '#perfil' );
    $('#bar-tab-item-user .tab-label').html( data.firstName.substr(0,8) );

  };

  var notAuthenticated = function(data) {
    var isAuthenticated = (data && data.uid);
    if (isAuthenticated) return;

    $('#authentication a').attr('href', '/auth/facebook');
    $('#authentication strong').html('Logar usando Facebook');

    $('#bar-tab-item-user a').attr( 'href', '/auth/facebook' );
    $('#bar-tab-item-user .tab-label').html( 'Login' );

  };


  !function () {
    $('#authentication a, #bar-tab-item-user a').click(function(){
      Lanche.spinner.start();
    });
  }();

})(window, Zepto);

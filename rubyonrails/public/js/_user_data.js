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

  var authenticated = function(data) {
    var isAuthenticated = (data && data.uid);
    if (!isAuthenticated) return;

    $('#authentication a').attr('href', '/signout');
    $('#authentication strong').html('Sair');
    $('#bar-tab-item-user')
    .empty()
    .addClass('tab-item')
    .append(""+
      "<a href='#user'>"+
        "<img class='tab-icon' src='img/icon-profile.png'>"+
        "<div class='tab-label'>"+ data.firstName.substr(0,8) +"</div>"+
      "</a>"
    );

  };

  var notAuthenticated = function(data) {
    var isAuthenticated = (data && data.uid);
    if (isAuthenticated) return;

    $('#authentication a').attr('href', '/auth/facebook');
    $('#authentication strong').html('Logar usando Facebook');
    $('#bar-tab-item-user')
    .empty()
    .removeClass('tab-item');

  };

})(window, Zepto);

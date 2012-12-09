;(function(window, $){

  var Lanche = window.Lanche = window.Lanche || function() {};
  var User = Lanche.User = function() {};

  $.getJSON('/user.json', function(data){
    User.data = data;
    if (data) {

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
      )
      ;

    } else {

      $('#authentication a').attr('href', '/auth/facebook');
      $('#authentication strong').html('Logar usando Facebook');
      $('#bar-tab-item-user')
      .empty()
      .removeClass('tab-item')
      ;
      
    }

  });

  // Routes
  !function () {
    Path.map("#user").to(function() {
      Lanche.spinner.start();
      head
      .js("js/_user.js")
      .ready( function() {
        Lanche.User.load();
      });
    }).enter(Lanche.Util.clearPanel);

    Path.listen();
  }();

})(window, Zepto);




function check(param) {
  var element = $(event.target);
  var request = $.ajax({
    url: '/people/check/' + param,
    method: 'POST',
    contentType: 'application/json',
    dataType:'json'
  });

  request.done(function( res ) {
    var msg = 'Check-'+res.status+' Realizado!';



    if (res.total) {
      var hours = Math.trunc(res.total / 60);
      var minutes = res.total % 60;
      msg += ' (' +hours + ':'+ minutes+')';
    }

    alert(msg);

    element.removeClass('in');
    element.removeClass('out');
    element.addClass(res.status);
  });

  request.fail(function( jqXHR ) {
    alert( 'Erro: ' + jqXHR.responseText );
  });
}

$('#clock').ready(function () {
  reloadClock($('#clock'));
});

function reloadClock(clock) {

  var d = new Date();

  var datestring = d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " +
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  clock.html(datestring);
  setTimeout(function () {
    reloadClock(clock);
  },1000);

}

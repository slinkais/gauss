var matrica = [];
var iterator = 1;

$(function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        var index = i * 4 + j;
        var aprekins = document.getElementById('x' + (i + 1) + (j + 1));
        aprekins.addEventListener('input', function()
        {
            console.log('input changed to: ', this.value);
            if(this.value != '') {
                aprekinat();
            }
        });
        matrica.push(aprekins.value);
      }
    }
    aprekinat();
});

function aprekinat() {
  nolasitInput();
  $('#aprekins *').empty();
  $('#aprekins').append('<p>Ievadītā matrica:</p>');
  $('#aprekins').append(matricaTabula());
  for (var i = 0; i < matrica.length; i++) {
    matrica[i] = Math.round(Math.random() * 10);
  }
  $('#aprekins').append('<p>Pēc pārveidojuma matrica:</p>');
  $('#aprekins').append(matricaTabula());
}

function matricaTabula() {
  var atbilde = '<table align="center">';
  for (var i = 0; i < 3; i++) {
    atbilde += '<tr>';
    for (var j = 0; j < 4; j++) {
      var index = i * 4 + j;
      atbilde += '<td>' + matrica[index] + '</td>';
    }
    atbilde += '</tr>';
  }
  atbilde += '</table>';
  return atbilde;
}

function nolasitInput() {
  matrica = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      var index = i * 4 + j;
      var aprekins = document.getElementById('x' + (i + 1) + (j + 1));
      matrica.push(aprekins.value);
    }
  }
}

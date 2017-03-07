var matrica = [];
var iterator = 1;
var x, y, z;

$(function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        var index = i * 4 + j;
        var aprekins = document.getElementById('x' + (i + 1) + (j + 1));
        aprekins.addEventListener('input', function()
        {
            nolasitInput();
            console.log('input changed to: ', this.value);
            for (var k = 0; k < matrica.length; k++) {
                if(matrica[k] === '' || isNaN(matrica[k]) || Math.abs(matrica[k]) >= Number.MAX_SAFE_INTEGER) {
                  return;
                }
            }
            aprekinat();
        });
        matrica.push(aprekins.value);
      }
    }
    aprekinat();
});

function aprekinat() {
  var parbaudesMatrica = matrica.slice();
  $('#aprekins *').empty();
  $('#aprekins').append('<h2>Aprēķins</h2>');
  $('#aprekins').append('<p>Ievadītā matrica:</p>');
  $('#aprekins').append(matricaTabula());
  var dalitajs = matrica[0];
  for (var i = 0; i < 4; i++) {
    matrica[i] /= dalitajs;
  }
  $('#aprekins').append('<p>R1 / '+ round(dalitajs,4) +'</p>');
  $('#aprekins').append(matricaTabula());
  var reizinatajs = matrica[4];
  for (var i = 4; i < 8; i++) {
    matrica[i] = matrica[i] - (matrica[i-4] * reizinatajs);
  }
  $('#aprekins').append('<p>R2 - ('+ round(reizinatajs,4) +'R1)</p>');
  reizinatajs = matrica[8];
  for (var i = 8; i < 12; i++) {
    matrica[i] = matrica[i] - (matrica[i-8] * reizinatajs);
  }
  $('#aprekins').append('<p>R3 - ('+ round(reizinatajs,4) +'R1)</p>');
  $('#aprekins').append(matricaTabula());
  dalitajs = matrica[5];
  for (var i = 5; i < 8; i++) {
    matrica[i] /= dalitajs;
  }
  $('#aprekins').append('<p>R2 / '+ round(dalitajs,4) +'</p>');
  $('#aprekins').append(matricaTabula());
  reizinatajs = matrica[9];
  for (var i = 9; i < 12; i++) {
    matrica[i] = matrica[i] - (matrica[i-4] * reizinatajs);
  }
  $('#aprekins').append('<p>R3 - ('+ reizinatajs +'R2)</p>');
  $('#aprekins').append(matricaTabula());
  if(matrica[10] === 0 && matrica[11] !== 0) {
    $('#aprekins').append('<p>0Z = ' + matrica[11] + '</p>');
    $('#aprekins').append('<p>Nav atrisinājuma!</p>');
    $('#parbaude *').empty();
    $('#atbilde *').empty();
    $('#atbilde').append('<h2>Atbilde</h2>');
    $('#atbilde').append('<h3>Sistēmai nav atrisinājuma</h3>');
  } else if (matrica[11] === 0 && matrica[10] === 0) {
    matrica[11] = 'C';
    matrica[10] = 'Z';
    $('#aprekins').append('<p>Z = C</p>');
    $('#aprekins').append(matricaTabula());
    var temp = matrica[6] + 'C';
    y = round(matrica[7],4) + ' - (' + temp + ')';
    $('#aprekins').append('<p>Y = ' + y + '</p>');
    x = round(matrica[3] - (matrica[1] * matrica[7]),4) + ' - (' + round(matrica[1] * matrica[7],4 - matrica[2],4) + 'C)';
    $('#aprekins').append('<p>X = ' + x + '</p>');
    $('#parbaude *').empty();
    $('#atbilde *').empty();
    $('#atbilde').append('<h2>Atbilde</h2>');
    $('#atbilde').append('<h3>('+ round(x,4) + ', ' + round(y,4) + ', C)</h3>');
  }
  else {
    matrica[11] /= matrica[10];
    $('#aprekins').append('<p>R3 / ' + round(matrica[10],4) + '</p>');
    matrica[10] = 'Z';
    z = matrica[11];
    $('#aprekins').append(matricaTabula());
    var temp = matrica[6] * z;
    y = matrica[7] - temp;
    $('#aprekins').append('<p>Y = ' + round(matrica[7],4) + ' - ' + round(temp,4) + ' = ' + round(y,4) + '</p>');
    x = matrica[3] - (matrica[1] * y) - (matrica[2] * z);
    $('#aprekins').append('<p>X = ' + round(matrica[3],4) + ' - (' + round((matrica[1] * y),4) + ') - (' + round((matrica[2] * z),4) + ') = ' + round(x,4) + '</p>');
    var temp = matrica.slice();
    matrica = parbaudesMatrica.slice();
    $('#parbaude *').empty();
    $('#parbaude').append('<h2>Pārbaude</h2>');
    for (var i = 0; i < 12; i++) {
      if(i === 0 || i === 4 || i === 8) {
        matrica[i] = matrica[i] + ' * ' + round(x,4);
      }
      if(i === 1 || i === 5 || i === 9) {
        matrica[i] = matrica[i] + ' * ' + round(y,4);
      }
      if(i === 2 || i === 6 || i === 10) {
        matrica[i] = matrica[i] + ' * ' + round(z,4);
      }
    }
    $('#parbaude').append(matricaTabula());

    matrica[0] = parbaudesMatrica[0] * x;
    matrica[1] = parbaudesMatrica[1] * y;
    matrica[2] = parbaudesMatrica[2] * z;
    matrica[4] = parbaudesMatrica[4] * x;
    matrica[5] = parbaudesMatrica[5] * y;
    matrica[6] = parbaudesMatrica[6] * z;
    matrica[8] = parbaudesMatrica[8] * x;
    matrica[9] = parbaudesMatrica[9] * y;
    matrica[10] = parbaudesMatrica[10] * z;
    $('#parbaude').append(matricaTabula());
    matrica[2] = matrica[0] + matrica[1] + matrica[2];
    matrica[6] = matrica[4] + matrica[5] + matrica[6];
    matrica[10] = matrica[8] + matrica[9] + matrica[10];
    matrica[0] = '';
    matrica[1] = '';
    matrica[4] = '';
    matrica[5] = '';
    matrica[8] = '';
    matrica[9] = '';
    $('#parbaude').append(matricaTabula());
    $('#atbilde *').empty();
    $('#atbilde').append('<h2>Atbilde</h2>');
    $('#atbilde').append('<h3>('+ round(x,4) + ', ' + round(y,4) + ', ' + round(z,4) + ')</h3>');
  }
}

function matricaTabula() {
  var atbilde = '<table align="center">';
  for (var i = 0; i < 3; i++) {
    atbilde += '<tr>';
    for (var j = 0; j < 4; j++) {
      var index = i * 4 + j;
      if(j === 3) {
        atbilde += '<td><strong>' + round(matrica[index],4) + '</strong></td>';
      } else {
      atbilde += '<td>' + round(matrica[index],4) + '</td>';
    }
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

function round(value, decimals) {
  if(isNaN(value) || value === '') {
    return value;
  }
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

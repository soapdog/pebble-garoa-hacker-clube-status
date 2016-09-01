/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://status.garoa.net.br/status';

function verificaStatus() {

  ajax({url: URL, type: 'json'},
    function(json) {
      // Data is supplied here
      var msg = "";
      var banner = "";
      
      if (json.open) {
        msg = "O garoa esta aberto";
        banner = "images/aberto.png";
      } else {
        msg = "O garoa esta fechado";
        banner = "images/fechado.png";
      }
      
      var statusCard = new UI.Card({
        title: "Garoa Status",
        banner: banner,
        body: msg
      });
      
      statusCard.show();
  
    },
    function(error) {
      console.log('Ajax failed: ' + error);
    }
  );
  
}


var splashCard = new UI.Card({
  title: 'Garoa Status',
  icon: "images/icon.png",
  body: 'Carregando...'
});

splashCard.on('show', verificaStatus);

splashCard.show();





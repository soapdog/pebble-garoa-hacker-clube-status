/**
* Welcome to Pebble.js!
*
* This is where you write your app.
*/

var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://status.garoa.net.br/status';
var Vector2 = require('vector2');

var loadingCard = new UI.Window({
	backgroundColor: 'white',
	fullscreen: true
});

var logoW = new UI.Image({
	position: new Vector2(50, 10),
	size: new Vector2(50, 50),
	image: 'images/icon.png'
});

var titleW = new UI.Text({
	position: new Vector2(0, 55),
	size: new Vector2(144, 168),
	font: 'bitham-30-black',
	text: 'Garoa Status',
	color: 'black',
	textAlign: 'center'
});

var loaderW = new UI.Text({
	position: new Vector2(0, 130),
	size: new Vector2(144, 168),
	font: 'gothic-14',
	text: 'Carregando...',
	color: 'black',
	textAlign: 'center'
});


loadingCard.add(logoW);
loadingCard.add(titleW);
loadingCard.add(loaderW);

loadingCard.on('show', function(e) {
	setTimeout(function () {
		verificaStatus();
	}, 1000);
});
loadingCard.show();

function verificaStatus() {
	ajax({url: URL, type: 'json'},
		 function(json) {
			var msg = "";
			var banner = "";

			if (json.open) {
				msg = "O Garoa está aberto!";
				banner = "images/aberto.png";
			} else {
				msg = "O Garoa está fechado!";
				banner = "images/fechado.png";
			}

			var statusCard = new UI.Window({
				backgroundColor: 'white',
				fullscreen: true
			});

			var titleI = new UI.Text({
				position: new Vector2(0, 0),
				size: new Vector2(144, 168),
				font: 'gothic-24-bold',
				text: 'Garoa Status',
				color: 'black',
				textAlign: 'center'
			});

			var imageI = new UI.Image({
				position: new Vector2(22, 35),
				size: new Vector2(100, 100),
				image: banner,
				backgroundColor: 'white'
			});


			var statusI = new UI.Text({
				position: new Vector2(0, 140),
				size: new Vector2(144, 168),
				font: 'gothic-14',
				text: msg,
				color: 'black',
				textAlign: 'center'
			});

			loadingCard.hide();

			statusCard.add(titleI);
			statusCard.add(imageI);
			statusCard.add(statusI);
			statusCard.show();
		},
		function(error) {
			console.log('Ajax failed: ' + error);
		});
}

const url 			= "https://blockchain.info/ticker";
const symbol 		= document.querySelector('#price_sign');
const price_label 	= document.querySelector('#price_label');
var indic 			= "";

function load() {
	let request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			let response = request.response;
			if (document.querySelectorAll('option').length === 1) {
				for (elm in response) {
					symbol.innerHTML += "<option value=\"" + [response[elm].last, elm]
						+ "\">" + response[elm].symbol + "</option>"
				}
			} else if (indic != "") {
				price_label.textContent = response[indic].last;
				console.log(response[indic].last);
			}
			symbol.addEventListener('change', () => {
				price_label.textContent = symbol.value.split(',')[0];
				indic = symbol.value.split(',')[1];
			});
		} else {
			alert("Un problème avec l'API est survenu. Veuillez réessayer plus tard.");
		}
	}
}
load();
setInterval(load, 3000);
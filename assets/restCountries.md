



let country = "united kingdom";

fetch("https://restcountries.com/v2/name/" + country)
.then(function(response) {
	return response.json();
})
.then(function(data) {
	console.log(data);

document.getElementById("name-common").innerHTML = data[0].name;

document.getElementById("capital").innerHTML = "Capital City: " + data[0].capital;

document.getElementById("population").innerHTML = "Population: " + Math.round(data[0].population / 1000) + "k";

document.getElementById("flag").src = data[0].flags.png;

document.getElementById("languages").innerHTML = "Language: " + data[0].languages[0].name;

document.getElementById("region").innerHTML = "Continent: " + data[0].region;

document.getElementById("currency").innerHTML = "Currency: " + data[0].currencies[0].symbol + " - " + data[0].currencies[0].name;


});


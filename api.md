# Airports API

```
let iataCode = "LHR"

let iataCodeParam= "?iata=" + iataCode;

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://airport-info.p.rapidapi.com/airport" + iataCodeParam,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9ee8b23d3bmsh82ee0f4109b9cddp1b620bjsne6ac17303a6c",
		"X-RapidAPI-Host": "airport-info.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {

	console.log(response);
	$("#render").text(JSON.stringify(response));

});
```


# Exchange Rate API
```
let apiKey =  "73371eacab78c8782c5a311f"
let currCode = "GBP"
let queryUrl =  "https://v6.exchangerate-api.com/v6/73371eacab78c8782c5a311f/latest/" + currCode;

const settings = {
	"async": true,
	"crossDomain": true,
	"url": queryUrl,
	"method": "GET",
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
```
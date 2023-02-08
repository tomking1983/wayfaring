# wayfaring

Pexels API Key: 6KR7dMuHoheLrHkuMuBjt6aKsO5jCwMfhReAjQo6DaxyBHpWb7m0THy7

rest countries link (no api key needed) - https://restcountries.com/v2/name/{country name}

## Airport API: 

```
iataCode = "LHR"

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://airport-info.p.rapidapi.com/airport?iata=" + iataCode,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9ee8b23d3bmsh82ee0f4109b9cddp1b620bjsne6ac17303a6c",
		"X-RapidAPI-Host": "airport-info.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {

	console.log(response);

});
```
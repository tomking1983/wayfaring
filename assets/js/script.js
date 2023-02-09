


//listener for the submit button
document.getElementById("submit").addEventListener("click", function() {
    country = document.getElementById("search").value;
    console.log(country);

    // listener for the enter key
    document.getElementById("search").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("submit").click();
        }
    });




fetch("https://restcountries.com/v2/name/" + country)
.then(function(response) {
	return response.json();
})
.then(function(data) {
	console.log(data);

    // error handling
    if (data.status == 404) {
        // insert a message in red under the search box with id search 
        document.getElementById("search-error").innerHTML += "<br><span style='color:red'>Country not found</span>";
    } else {
        // remove the error message
        document.getElementById("search-error").innerHTML = "";
    }



    // display data

document.getElementById("name-common").innerHTML = data[0].name;

document.getElementById("capital").innerHTML = "Capital City: " + data[0].capital;
// create a link that goes to wikipedia and searches for the data[0].capital. the link text should say "learn more about data[0].capital on Wikipedia"
document.getElementById("capital").innerHTML += " <a href='https://en.wikipedia.org/wiki/" + data[0].capital + "' target='_blank'><br>Learn more about " + data[0].capital + " on Wikipedia</a>";

document.getElementById("population").innerHTML = "Population: " + data[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

document.getElementById("flag").src = data[0].flags.png;

document.getElementById("languages").innerHTML = "Language: " + data[0].languages[0].name;

document.getElementById("region").innerHTML = "Continent: " + data[0].region;

document.getElementById("currency").innerHTML = "Currency: " + data[0].currencies[0].symbol + " - " + data[0].currencies[0].name;

// get currency code
document.getElementById("currency-code").innerHTML = "Currency Code: " + data[0].currencies[0].code;

document.getElementById("dial-code").innerHTML = "Country Dial Code: +" + data[0].callingCodes;

// if continent is americas show sub region
if (data[0].region == "Americas") {
    document.getElementById("sub-region").innerHTML = "Sub Region: " + data[0].subregion;
} else {

    // if continent is not americas hide sub region
    document.getElementById("sub-region").style.display = "none";
}
})
})



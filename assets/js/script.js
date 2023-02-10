//listener for the submit button
document.getElementById("submit").addEventListener("click", function () {
  country = document.getElementById("search").value;
  // clear search field
  document.getElementById("search").value = "";

  // listener for the enter key
  document.getElementById("search").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit").click();
    }
  });

  fetch("https://restcountries.com/v2/name/" + country)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // error handling
      if (data.status == 404) {
        // clear the data in searchData if there is any
        $("#searchData").empty();
        // using sweet alert for pop up message - https://sweetalert.js.org/
        swal(
          "Oops, " + country + " " + "is not a valid country",
          "Please try again!",
          "error"
        );
      }

      // display data

      document.getElementById("name-common").innerHTML = data[0].name;

      document.getElementById("capital").innerHTML =
        "Capital City: " + data[0].capital;
      // link to wiki page of cpaital city
      document.getElementById("capital").innerHTML +=
        " <a href='https://en.wikipedia.org/wiki/" +
        data[0].capital +
        "' target='_blank'><br>Learn more about " +
        data[0].capital +
        " on Wikipedia</a>";

      document.getElementById("population").innerHTML =
        "Population: " +
        data[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      document.getElementById("flag").src = data[0].flags.png;

      document.getElementById("languages").innerHTML =
        "Language: " + data[0].languages[0].name;

      document.getElementById("region").innerHTML =
        "Continent: " + data[0].region;

      document.getElementById("currency").innerHTML =
        "Currency: " +
        data[0].currencies[0].symbol +
        " - " +
        data[0].currencies[0].name;

      // get currency code
      document.getElementById("currency-code").innerHTML =
        "Currency Code: " + data[0].currencies[0].code;

      document.getElementById("dial-code").innerHTML =
        "Country Dial Code: +" + data[0].callingCodes;

      // if continent is americas show sub region
      if (data[0].region == "Americas") {
        document.getElementById("sub-region").innerHTML =
          "Sub Region: " + data[0].subregion;
      } else {
        // if continent is not americas hide sub region
        document.getElementById("sub-region").style.display = "none";
      }

      // ----------------Translation---------------------------------------------------//

      // translation
      let transLanguage = data[0].languages[0].iso639_1;
      let phrases = [
        "where is the nearest toilet",
        "where is the nearest hospital",
        "how much is this?",
        "do you speak English?",
        "where is the nearest police station?",

      ];

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "a176a20944mshc76e53de9c9490bp1d0250jsnb4bb67925c41",
          "X-RapidAPI-Host":
            "translated-mymemory---translation-memory.p.rapidapi.com",
        },
      };

      // loop through the phrases array and translate
      for (let i = 0; i < phrases.length; i++) {
        fetch(
          "https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7C" +
            transLanguage +
            "&q=" +
            phrases[i] +
            "&mt=1&onlyprivate=0&de=a%40b.c",
          options
        )
          .then(function (response) {
            return response.json();
          })

        //   if transLanguage is en then dont display the translation and hide the section with teh id of translations
        
          .then(function (data) {

            // display the translations and add a <h2> heading for each
            if (i == 0) {
                document.getElementById("toilet").innerHTML = "<h2>Where is the nearest toilet?</h2>" + data.responseData.translatedText;
                }

            if (i == 1) {
                document.getElementById("hospital").innerHTML = "<h2>Where is the nearest hospital?</h2>" + data.responseData.translatedText;
                }

            if (i == 2) {
                document.getElementById("price").innerHTML = "<h2>How much is this?</h2>" + data.responseData.translatedText;
                }

            if (i == 3) {
                document.getElementById("speakEnglish").innerHTML = "<h2>Do you speak English?</h2>" + data.responseData.translatedText;
                }

            if (i == 4) {
                document.getElementById("police").innerHTML = "<h2>Where is the nearest police station?</h2>" + data.responseData.translatedText;
                }

                 // if trans language is en then overide the error from the api and display the english version of the phrase
            if (transLanguage == "en") {
                if (i == 0) {
                    document.getElementById("toilet").innerHTML = "<h2>Where is the nearest toilet?</h2>" + phrases[i];
                    }

                if (i == 1) {
                    document.getElementById("hospital").innerHTML = "<h2>Where is the nearest hospital?</h2>" + phrases[i];
                    }

                if (i == 2) {
                    document.getElementById("price").innerHTML = "<h2>How much is this?</h2>" + phrases[i];
                    }

                if (i == 3) {
                    document.getElementById("speakEnglish").innerHTML = "<h2>Do you speak English?</h2>" + phrases[i];
                    }

                if (i == 4) {
                    document.getElementById("police").innerHTML = "<h2>Where is the nearest police station?</h2>" + phrases[i];
                    }
                }
            
            });
        }
    });
});


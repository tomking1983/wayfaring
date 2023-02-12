// display the countries the user has searched for
// create an array for local storage to store the countries the user has searched for
let countries = [];
// check if there is anything in local storage
if (localStorage.getItem("countries") != null) {
   // if there is something in local storage, get it and parse it
   countries = JSON.parse(localStorage.getItem("countries"));
   // display the countries
   displayCountries();
};

// save the countries array to local storage
localStorage.setItem("countries", JSON.stringify(countries));
function displayCountries() {
   // clear the data in the countries div
   $("#countries").empty();
   // loop through the countries array and display the countries
   for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      let li = $("<li>").text(country);
      $("#countries").append(li);
   }
   
   // add a clear button to clear the countries array and local storage
   let clearBtn = $("<button>").text("Clear");
   $("#countries").append(clearBtn);
    // listener for the clear button
   clearBtn.on("click", function () {
      // clear the countries array
      countries = [];
      // clear local storage
      localStorage.clear();
      // clear the countries div
      $("#countries").empty();
   }
   );
}

//-- variables for opentripmap
var capitalCity;
var countryName;
var currencyCode;


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

  //   save the search to local storage if valid
  if (country != "") {
   countries.push(country);
   localStorage.setItem("countries", JSON.stringify(countries));
   displayCountries();
}

  fetch("https://restcountries.com/v2/name/" + country)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // error handling
      if (data.status == 404) {
        // clear the data in searchData if there is any
        $("#searchData").empty();
        // clear the translation data
        $("#toilet").empty();
        $("#hospital").empty();
        $("#price").empty();
        $("#speakEnglish").empty();
        $("#police").empty();

        // using sweet alert for pop up message - https://sweetalert.js.org/
        swal(
          "Oops, " + country + " " + "is not a valid country",
          "Please try again!",
          "error"
          // when clicking on the button, reload the page          
        ).then(function () {
         location.reload();
       }
       );
     };

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

        //--PEI put capital city into a var
        capitalCity = data[0].capital;
        countryName = data[0].name;

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


        //--PEI put currency co into a var
        currencyCode = data[0].currencies[0].code;

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
        "Where is the nearest toilet",
        "Where is the nearest hospital",
        "How much is this?",
        "Do you speak English?",
        "Where is the nearest police station?",

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
          .then(function (data) {

            // display the translations and add a <h3> heading for each
            if (i == 0) {
                document.getElementById("toilet").innerHTML = "<h3>Where is the nearest toilet?</h3>" + data.responseData.translatedText;
                }

            if (i == 1) {
                document.getElementById("hospital").innerHTML = "<h3>Where is the nearest hospital?</h3>" + data.responseData.translatedText;
                }

            if (i == 2) {
                document.getElementById("price").innerHTML = "<h3>How much is this?</h3>" + data.responseData.translatedText;
                }

            if (i == 3) {
                document.getElementById("speakEnglish").innerHTML = "<h3>Do you speak English?</h3>" + data.responseData.translatedText;
                }

            if (i == 4) {
                document.getElementById("police").innerHTML = "<h3>Where is the nearest police station?</h3>" + data.responseData.translatedText;
                }

                 // if trans language is en then overide the error from the api and display the english version of the phrase
            if (transLanguage == "en") {
                if (i == 0) {
                    document.getElementById("toilet").innerHTML = "<h3>Where is the nearest toilet?</h3>" + phrases[i];
                    }

                if (i == 1) {
                    document.getElementById("hospital").innerHTML = "<h3>Where is the nearest hospital?</h3>" + phrases[i];
                    }

                if (i == 2) {
                    document.getElementById("price").innerHTML = "<h3>How much is this?</h3>" + phrases[i];
                    }

                if (i == 3) {
                    document.getElementById("speakEnglish").innerHTML = "<h3>Do you speak English?</h3>" + phrases[i];
                    }

                if (i == 4) {
                    document.getElementById("police").innerHTML = "<h3>Where is the nearest police station?</h3>" + phrases[i];
                    }
                }
            
            });
            // end of translation
        }



  //-- =========================================================
  //-- Pei Open Map API
  //-- =========================================================
        
        //You should get your API key at https://opentripmap.io
  const apiKey = "5ae2e3f221c38a28845f05b673706e4aab3a9a3c52de530d3ad5a978";

  function apiGet(method, query) {
    return new Promise(function(resolve, reject) {
      var otmAPI =
        "https://api.opentripmap.com/0.1/en/places/" +
        method +
        "?apikey=" +
        apiKey;
      if (query !== undefined) {
        otmAPI += "&" + query;
      }
      fetch(otmAPI)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }
  
  //-- Init global variables for paging:

  const pageLength = 8; // number of objects per page

  let lon; // place longitude
  let lat; // place latitude

  let offset = 0; // offset from first object in the list
  let count; // total objects count
  
  //-- This function uses the capital city from the rest api to get place location from open trip map API.
  let otmPlaceName;
  let otmCountryName;

        apiGet("geoname", "name=" + capitalCity).then(function(data) {
          let message = "Name not found";
          if (data.status == "OK") {
            // message = data.name + ", " + getCountryName(data.country);
            otmPlaceName = data.name;
            otmCountryName =  getCountryName(data.country);
            message = ``;
            lon = data.lon;
            lat = data.lat;
            firstLoad();
            document.getElementById("countryName").innerText = otmCountryName;
          }
          document.getElementById("info").innerHTML = `${message}`;
        });


  //-- Pei:  This function gets total objects count within 1000 meters from specified location (lon, lat) and then loads first objects page:
  var otmRate = 3;
  var otmRadius = 3000;
  var otmRadiusText = otmRadius / 1000;

  function firstLoad() {
    apiGet(
      "radius",
      `radius=${otmRadius}&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=${otmRate}&format=count`
  ).then(function(data) {
    count = data.count;
    offset = 0;
    document.getElementById(
      "info"
    ).innerHTML += `<p>There are ${count} places to visit within a ` + otmRadiusText + `km radius in ` + otmPlaceName+ `, ` + otmCountryName+ `</p>`;
    loadList();
  });
  }


  //--Pei: This function load POI's list page to the left pane. It uses 1000 meters radius for objects search:

  function loadList() {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
    ).then(function(data) {
      let list = document.getElementById("list");
      list.innerHTML = "";
      data.forEach(item => list.appendChild(createListItem(item)));
      let nextBtn = document.getElementById("next_button");
      if (count < offset + pageLength) {
        nextBtn.style.visibility = "hidden";
      } else {
        nextBtn.style.visibility = "visible";
        nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
      }
//-- PW
let xid = data[0].xid;
apiGet("xid/" + xid).then(data=> show1stPOI(data));

    });
  }


  //--Pei  This function create a list item at the left pane:
function createListItem(item) {
  let a = document.createElement("a");
  a.className = "list-group-item list-group-item-action";
  a.setAttribute("data-id", item.xid);
  a.innerHTML = `<p class="list-group-item-heading">${item.name}</p>
            <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;
  
  a.addEventListener("click", function() {
    document.querySelectorAll("#list a").forEach(function(item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
    let xid = this.getAttribute("data-id");
    apiGet("xid/" + xid).then(data => onShowPOI(data));
  });
  return a;
  }

    //--Pei's own function to render first POI

    function show1stPOI (data1st) {
      console.log("show data1st:", data1st)
      let poi = document.getElementById("poi");
      poi.classList.add("poiP");
      poi.innerHTML = "";
      if (data1st.preview) {
        poi.innerHTML += `<img id="poiImg" class="imgOpenMap" src="${data1st.preview.source}">`;
        poi.innerHTML += data1st.wikipedia_extracts
        ? data1st.wikipedia_extracts.html 
        : data1st.info
        ? data1st.info.descr
        : "No description";
      }
    }

  //-- Pei:  This function shows preview and description at the right pane:
  function onShowPOI(data) {
  let poi = document.getElementById("poi");
  poi.classList.add("poiP");
  poi.innerHTML = "";
  if (data.preview) {
    poi.innerHTML += `<img class="imgOpenMap" src="${data.preview.source}">`;
  }
  poi.innerHTML += data.wikipedia_extracts
    ? data.wikipedia_extracts.html
    : data.info
    ? data.info.descr
    : "No description";
  
  // poi.innerHTML += `<p class="poiP"><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
  }

  //--Pei:  This block process Next page button
  document
  .getElementById("next_button")
  .addEventListener("click", function() {
    offset += pageLength;
    loadList();
  });

  //-- end of openTripMap API


        // end of REST Countries
    });
});

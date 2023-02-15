//-- =========================================================
//-- Local Storage
//-- =========================================================

// Local Storage array
let countries = [];
// check if there is anything in local storage
if (localStorage.getItem("countries") != null) {
  // if there is something in local storage, get it and parse it
  countries = JSON.parse(localStorage.getItem("countries"));
  // display the countries
  displayCountries();
}


// save the countries array to local storage
localStorage.setItem("countries", JSON.stringify(countries));
function displayCountries() {
  // clear the data in the countries div
  $(".search-container").empty();
  // only display each country once
  countries = [...new Set(countries)];
  // loop through the countries array and display the countries
  for (let i = 0; i < countries.length; i++) {
    let country = countries[i];
    let li = $("<li>").text(country);
    $(".search-container").append(li);
    li.css("text-transform", "uppercase");
    // add a clear button to delete country from local storage
    let clearBtn = $("<button>").text("Clear " + country);
    clearBtn.css("text-transform", "uppercase");
    li.append(clearBtn);
    $(".search-container").append(clearBtn);
    // listener for the clear button
    clearBtn.on("click", function () {
      // remove the country from the countries array
      countries.splice(i, 1);
      // save the country to local storage
      localStorage.setItem("countries", JSON.stringify(countries));
      // display the countries
      displayCountries();
    });
  }

  // add a clear button to clear the countries array and local storage
  let clearBtn = $("<button>").text("Clear All");
  $(".search-container").append(clearBtn);
  clearBtn.css("display", "block");
  clearBtn.css("text-transform", "uppercase");
  // listener for the clear button
  clearBtn.on("click", function () {
    // clear the countries array
    countries = [];
    // clear local storage
    localStorage.removeItem("countries");
    // clear the countries div
    $(".search-container").empty();
  });

  // search in local storage
  $(".search-container li").on("click", function () {
    // get the text of the country that was clicked
    let country = $(this).text();
    // set the value of the search field to the country that was clicked
    $("#search").val(country);
    // trigger the click event on the submit button
    $("#submit").trigger("click");
    // display the countries
    displayCountries();
  });
}

//-- variables for opentripmap
var capitalCity;
var countryName;
var currencyCode;

// listener for the enter key
document.getElementById("search").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});

//listener for the submit button
document.getElementById("submit").addEventListener("click", function () {
  country = document.getElementById("search").value;
  // clear search field
  document.getElementById("search").value = "";

  //-- Pei Clear the Forex
  document.getElementById("forEx").innerHTML = "";


  // Nathalie clear pixabay cont
  document.getElementById("pixabay-cont").innerHTML= "";
  
  //--Pei: clear country of the month
  document.getElementById("countryOfTheMth").setAttribute("class","hide");
  //--Pei: update h2 to new country name 

document.getElementById("ctyOfMth").addEventListener("click", function() {
  fetchApis("united kingdom");
  destMthEl.innerText = "Destination of the Month";
  document.getElementById("countryOfTheMth").setAttribute("class","visible");
});

  //--Pei: add button of the month 
  let destMthEl = document.getElementById("destMth");
  destMthEl.innerText = country;
  destMthEl.setAttribute("style","text-transform: capitalize;");  

  switch (country) {
    case "united kingdom" : 
      destMthEl.innerText = "Destination of the Month";
      document.getElementById("countryOfTheMth").setAttribute("class","visible");
      break;
    case "britain" :
      destMthEl.innerText = "Destination of the Month";
      document.getElementById("countryOfTheMth").setAttribute("class","visible");
      break;  
    default:  
      let navBtnEl = document.getElementById("ctyOfMth");
      navBtnEl.setAttribute("style","display: inline;");
      navBtnEl.setAttribute("class","visible");
  };


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
  };

  fetchApis(country);

});

function fetchApis(country) {
  //-- =========================================================
  //-- Rest Countries API
  //-- =========================================================

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
        // remove the searched country from the countries array and local storage
        countries.pop();
        localStorage.setItem("countries", JSON.stringify(countries));
        displayCountries();

        //-- =========================================================
        //-- Sweet Alert Error message
        //-- =========================================================

        // using sweet alert for pop up message - https://sweetalert.js.org/
        swal(
          "Oops, that is not a valid country",
          "Please try again!",
          "error"
          // when clicking on the button, reload the page
        ).then(function () {
          location.reload();
        });
      }

      //-- =========================================================
      //-- Rest Countries data display
      //-- =========================================================
      console.log("rest api:", data);
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
      // centre the text
      document.getElementById("searchData").style.textAlign = "center";

      //-- =========================================================
      //-- Translation API
      //-- =========================================================
      // get the language code
      let transLanguage = data[0].languages[0].iso639_1;
      let phrases = [
        "Where is the nearest toilet?",
        "Where is the nearest hospital",
        "How much is this?",
        "Do you speak English?",
        "Where is the nearest police station?",
      ];

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c9016df6a0msh1fb8ff99a9595a1p191ca1jsn38f92a641376",
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
            // display the translations and add a <h3> heading for each and center the text
            if (i == 0) {
              document.getElementById("toilet").innerHTML =
                "<h3>Where is the nearest toilet?</h3>" +
                data.responseData.translatedText;
            }

            if (i == 1) {
              document.getElementById("hospital").innerHTML =
                "<h3>Where is the nearest hospital?</h3>" +
                data.responseData.translatedText;
            }

            if (i == 2) {
              document.getElementById("price").innerHTML =
                "<h3>How much is this?</h3>" + data.responseData.translatedText;
            }

            if (i == 3) {
              document.getElementById("speakEnglish").innerHTML =
                "<h3>Do you speak English?</h3>" +
                data.responseData.translatedText;
            }

            if (i == 4) {
              document.getElementById("police").innerHTML =
                "<h3>Where is the nearest police station?</h3>" +
                data.responseData.translatedText;
              // } centre the text
              document.getElementById("toilet").style.textAlign = "center";
              document.getElementById("hospital").style.textAlign = "center";
              document.getElementById("price").style.textAlign = "center";
              document.getElementById("speakEnglish").style.textAlign =
                "center";
              document.getElementById("police").style.textAlign = "center";
            }

            // if trans language is en then overide the error from the api and display the english version of the phrase
            if (transLanguage == "en") {
              if (i == 0) {
                document.getElementById("toilet").innerHTML =
                  "<h3>Where is the nearest toilet?</h3>" + phrases[i];
              }

              if (i == 1) {
                document.getElementById("hospital").innerHTML =
                  "<h3>Where is the nearest hospital?</h3>" + phrases[i];
              }

              if (i == 2) {
                document.getElementById("price").innerHTML =
                  "<h3>How much is this?</h3>" + phrases[i];
              }

              if (i == 3) {
                document.getElementById("speakEnglish").innerHTML =
                  "<h3>Do you speak English?</h3>" + phrases[i];
              }

              if (i == 4) {
                document.getElementById("police").innerHTML =
                  "<h3>Where is the nearest police station?</h3>" + phrases[i];
                //  centre the text
                document.getElementById("toilet").style.textAlign = "center";
                document.getElementById("hospital").style.textAlign = "center";
                document.getElementById("price").style.textAlign = "center";
                document.getElementById("speakEnglish").style.textAlign =
                  "center";
                document.getElementById("police").style.textAlign = "center";
              }
            }
          });
        // end of translation
      }

      //-- =========================================================
      //-- Pei Exchange Rate API
      //-- =========================================================

      var isForEx = true;
      var currListFullArray;

      if (isForEx === true) {
        let apiKey = "73371eacab78c8782c5a311f";
        let queryUrl =
          "https://v6.exchangerate-api.com/v6/" +
          apiKey +
          "/latest/" +
          currencyCode;
        
      fetch(queryUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          if (data.status == 404) {
            console.log("data.status:", data.status);
          };
          localStorage.setItem("currListFullArray", JSON.stringify(data));

          currListFullArray = JSON.parse(
            localStorage.getItem("currListFullArray")
          );
  
          let forExDivEl = document.getElementById("forEx");
  
          let currDestEl = document.createElement("span");
          currDestEl.setAttribute("id", "currDest");
          currDestEl.setAttribute("class", "currForEx");
          forExDivEl.appendChild(currDestEl);
  
          const currMultiplier = 10;
  
          function reformatCurr(number, currencyCode) {
            let formatCurrency = new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: currencyCode,
            });
            let currValueString = formatCurrency.format(number);
            return currValueString;
          }
  
          let currUSD = reformatCurr(
            currListFullArray.conversion_rates.USD * currMultiplier,
            "USD"
          );
          let currEuro = reformatCurr(
            currListFullArray.conversion_rates.EUR * currMultiplier,
            "EUR"
          );
          let currGBP = reformatCurr(
            currListFullArray.conversion_rates.GBP * currMultiplier,
            "GBP"
          );
          let currCNY = reformatCurr(
            currListFullArray.conversion_rates.CNY * currMultiplier,
            "CNY"
          );
          let currSelectArr;
  
          switch (currencyCode) {
            case "USD":
              currSelectArr = [
                { curr: "EUR", value: currEuro },
                { curr: "CNY", value: currCNY },
                { curr: "GBP", value: currGBP },
              ];
              break;
            case "EUR":
              currSelectArr = [
                { curr: "USD", value: currUSD },
                { curr: "CNY", value: currCNY },
                { curr: "GBP", value: currGBP },
              ];
              break;
            case "CNY":
              currSelectArr = [
                { curr: "USD", value: currUSD },
                { curr: "EUR", value: currEuro },
                { curr: "GBP", value: currGBP },
              ];
              break;
            case "GBP":
              currSelectArr = [
                { curr: "USD", value: currUSD },
                { curr: "EUR", value: currEuro },
                { curr: "CNY", value: currCNY },
              ];
              break;
            default:
              currSelectArr = [
                { curr: "USD", value: currUSD },
                { curr: "EURO", value: currEuro },
                { curr: "CNY", value: currCNY },
                { curr: "GBP", value: currGBP },
              ];
          }
  
          currDestEl.innerText =
            reformatCurr(currMultiplier, currencyCode) + " is worth ";
  
          for (let i = 0; i < currSelectArr.length; i++) {
            let currBtnEl = document.createElement("button");
            currBtnEl.setAttribute("class", "currBtn");
            currBtnEl.setAttribute("id", currSelectArr[i].curr);
            currBtnEl.innerText = "in " + currSelectArr[i].curr;
            forExDivEl.appendChild(currBtnEl);
  
            let currBtn = document.getElementById(currSelectArr[i].curr);
            currBtn.addEventListener("mouseover", function () {
              currBtnEl.innerText = currSelectArr[i].value;
            });
            currBtn.addEventListener("mouseout", function () {
              currBtnEl.innerText = "in " + currSelectArr[i].curr;
            });
          };
          function getDateTimeFormat(unixDate, format) {
            let timeString = dayjs(unixDate * 1000).format(format);
            return timeString;
          }
  
          let currUpdateEl = document.createElement("p");
          currUpdateEl.setAttribute("id", "currUpdate");
          currUpdateEl.setAttribute("class", "termsText");
          currUpdateEl.innerHTML =
            "{Exchange rates last updated on " +
            getDateTimeFormat(
              currListFullArray.time_last_update_unix,
              "DD-MMM-YYYY, HHMM"
            ) +
            "h.  Please see <a href='" +
            currListFullArray.terms_of_use +
            "' alt='Terms of User' target='_blank' class='termsURL'>Exchange Rate API Terms of Use</a>.}";
  
          forExDivEl.appendChild(currUpdateEl);

        }); 


        //-- Pei End of Exchange Rate API
      }

      //-- =========================================================
      //-- Pei Open Map API
      //-- =========================================================

      //You should get your API key at https://opentripmap.io
      const apiKey = "5ae2e3f221c38a28845f05b673706e4aab3a9a3c52de530d3ad5a978";

      function apiGet(method, query) {
        return new Promise(function (resolve, reject) {
          var otmAPI =
            "https://api.opentripmap.com/0.1/en/places/" +
            method +
            "?apikey=" +
            apiKey;
          if (query !== undefined) {
            otmAPI += "&" + query;
          }
          fetch(otmAPI)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch(function (err) {
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

      apiGet("geoname", "name=" + capitalCity).then(function (data) {
        let message = "Name not found";
        if (data.status == "OK") {
          // message = data.name + ", " + getCountryName(data.country);
          otmPlaceName = data.name;
          otmCountryName = getCountryName(data.country);
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
        ).then(function (data) {
          count = data.count;
          offset = 0;
          document.getElementById("info").innerHTML +=
            `<p>There are ${count} places to visit within a ` +
            otmRadiusText +
            `km radius in ` +
            otmPlaceName +
            `, ` +
            otmCountryName +
            `</p>`;
          loadList();
        });
      }

      //--Pei: This function load POI's list page to the left pane. It uses 1000 meters radius for objects search:

      function loadList() {
        apiGet(
          "radius",
          `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
        ).then(function (data) {
          let list = document.getElementById("list");
          list.innerHTML = "";
          data.forEach((item) => list.appendChild(createListItem(item)));
          let nextBtn = document.getElementById("next_button");
          if (count < offset + pageLength) {
            nextBtn.style.visibility = "hidden";
          } else {
            nextBtn.style.visibility = "visible";
            nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
          }
          //-- PW
          let xid = data[0].xid;
          apiGet("xid/" + xid).then((data) => show1stPOI(data));
        });
      }

      //--Pei  This function create a list item at the left pane:
      function createListItem(item) {
        let a = document.createElement("a");
        a.className = "list-group-item list-group-item-action";
        a.setAttribute("data-id", item.xid);
        a.innerHTML = `<p class="list-group-item-heading">${item.name}</p>
            <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;

        a.addEventListener("click", function () {
          document.querySelectorAll("#list a").forEach(function (item) {
            item.classList.remove("active");
          });
          this.classList.add("active");
          let xid = this.getAttribute("data-id");
          apiGet("xid/" + xid).then((data) => onShowPOI(data));
        });
        return a;
      }

      //--Pei's own function to render first POI

      function show1stPOI(data1st) {
        console.log("show data1st:", data1st);
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
        .addEventListener("click", function () {
          offset += pageLength;
          loadList();
        });


      //-- =========================================================
      //-- Nathalie - pixabay API
      //-- =========================================================


      let pictureCont = document.getElementById("pixabay-cont");

      fetch('https://pixabay.com/api/?key=33509086-cc05bf73b92e15cea747beecb&q='+ country +'&image_type=photo&category=travel&safesearch=true&per_page=6')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)


        for (i = 0; i < 6; i++){

        let img = document.createElement('img')
        img.setAttribute('src', data.hits[i].largeImageURL)
        pictureCont.appendChild(img)}

        let p = document.createElement('p')
        p.innerHTML ='Photos provided by Pixabay API'
        pictureCont.appendChild(p)

        let piximg = document.createElement('img');
        piximg.setAttribute('src', './assets/images/pixabaylogo.png');
        piximg.setAttribute('id', 'pixlogo')
        pictureCont.appendChild(piximg)

        let pixlink = document.createElement('a');
        pixlink.setAttribute('href', 'https://pixabay.com/');
        pixlink.setAttribute('id', 'pixlink' )
        pixlink.innerHTML = 'PixaBay';
        pictureCont.appendChild(pixlink)

        // end of pixabay API
        })




      //-- end of openTripMap API

      // end of REST Countries
    });
//-- end of function fetchApis()
}

fetchApis("united kingdom");
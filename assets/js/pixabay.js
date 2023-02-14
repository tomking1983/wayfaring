


document.getElementById("submit").addEventListener("click", function () {

fetch('https://pixabay.com/api/?key=33509086-cc05bf73b92e15cea747beecb&q='+ countryName +'&image_type=photo&category=travel&safesearch=true&per_page=9')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })

})


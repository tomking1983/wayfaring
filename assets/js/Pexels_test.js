let searchQuery = 'Russia'
let PixaBaseBayURL = 'https://pixabay.com/api/?key=33509086-cc05bf73b92e15cea747beecb&q='+ searchQuery +'&image_type=photo&category=travel&safesearch=true&per_page=5'


$.ajax({
    url: PixaBaseBayURL,
    method: "GET",
    success: (function(response){
        console.log(response)
    })

})
let searchQuery = 'Russia';
let PixaBaseBayURL = 'https://pixabay.com/api/?key=33509086-cc05bf73b92e15cea747beecb&q='+ searchQuery +'&image_type=photo&category=travel&safesearch=true&per_page=5';
let testPixabay = $('#test-pixabay');

let favPlacesCont = $('#fav_places');









// $.ajax({
//     url: PixaBaseBayURL,
//     method: "GET",
//     success: (function(response){

//         console.log(response)
//         console.log(response.hits[1].largeImageURL)

//         let imgURL = response.hits[1].largeImageURL ;
//         let travelimg = $('<img>');
//         travelimg.attr('src', imgURL);
//         testPixabay.append(travelimg);

//     })
// })



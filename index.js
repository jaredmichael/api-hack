'use strict';

const appkey = '62d877701d9e3984da709539ef983f69';
const searchUrl = 'https://rest.bandsintown.com/artists/';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // if any remove previous results
    console.log(responseJson);
    $('#results-list').empty();
     //display results section
     $('#results').removeClass('hidden');
     $('.main-page').addClass('hidden');
    //interate through items array
    
    for (let i = 0; i < responseJson.length; i++) {
        //for each object in items array, add list item to results
        $('#results-list').append(
            `<li>
                <h2>${responseJson[i].lineup}</h2>
                <h3>${responseJson[i].datetime}</h3>
                <h3>${responseJson[i].venue.name}</h3>
                <p>${responseJson[i].venue.city}, ${responseJson[i].venue.region} ${responseJson[i].venue.country}</p>
                <h3><a href="${responseJson[i].offers.url}">Purchase Tickets</a></h3>
            </li></br>`
        )};       
}

function whosOnStage(query) {
    const params = {
        app_id: appkey,
        date: 'upcoming',    
    };

    const queryString = formatQueryParams(params)
    const url = searchUrl + encodeURIComponent(query) + '/events?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(responseJson => displayResults(responseJson))
        .catch( err => {
            $('#js-error-msg').text(`Oops! Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        whosOnStage(searchTerm);
    });
}

$(watchForm);
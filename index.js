'use strict';

const appkey = '62d877701d9e3984da709539ef983f69';
const searchUrl = 'https://rest.bandsintown.com/artists/';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // if any remove previous results
    $('#results-list').empty();
    //display results section
    $('.events').removeClass('hidden');
    $('footer').removeClass('hidden');
    $('.main-page').addClass('hidden');
    //interate through items array

    if (responseJson.length == 0) {
        $('#results-list').append(
            `<p>SORRY THERE ARE NO UPCOMING EVENTS AT THIS TIME</br></br>
            PLEASE CHECK BACK LATER OR SEARCH OTHER ARTIST EVENTS</p>`)
    }

    for (let i = 0; i < responseJson.length; i++) {
        //for each object in items array, add list item to results
        $('#results-list').append(
            `<li>
                <hr/>
                <h2>${responseJson[i].lineup}</h2>
                <p class="date">Date: ${new Date(responseJson[i].datetime).toLocaleDateString()}</p></br>
                <h3 class="venue">${responseJson[i].venue.name}</h3>
                <p class="venue">${responseJson[i].venue.city}, ${responseJson[i].venue.region} ${responseJson[i].venue.country}</p>
                <h2><a href="${responseJson[i].offers[0].url}" target="_new">Purchase Tickets</a></h2>
            </li></br>`
        )
    }
}

function whosOnStage(query) {
    const params = {
        app_id: appkey,
        date: 'upcoming',
    };

    const queryString = formatQueryParams(params)
    const url = searchUrl + encodeURIComponent(query) + '/events?' + queryString;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
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
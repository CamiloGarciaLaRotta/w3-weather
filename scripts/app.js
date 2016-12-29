//// Global variables

var queryParameters = '&units=metric&APPID=6f36f42e1677237f380a89ee3b72edec'
var API = 'http://api.openweathermap.org/data/2.5/weather'
var defaultT = 25;
var defaultS = 5;
var defaultD = 45;
var defaultCities = ["Kathmandu", "Lhasa", "İstanbul", "Pya", "Hokkaidō", 
                    "Lisbon", "Helsinki", "Osuna", "Northwich", "Villa del Rosario", 
                    "Santa Marta", "Leticia", "Cali"]

//// Event Listeners

function watchForSubmit() {
    $('.js-city-form').on('click', '.js-city-submit', function(event) {
        event.preventDefault()
        if (!($('.js-city-name').val())) {
             $( ".js-city-name" ).fadeOut('fast')
             $( ".js-city-name" ).fadeIn('fast')
            return;
        }
        var inputCity = $('.js-city-name').val();   
        handleWeather(inputCity)
    })
}

function watchForRandom() {
    $('.js-city-form').on('click', '.js-city-random', function(event){
        event.preventDefault()
        var randomCity = defaultCities[Math.floor(Math.random()*defaultCities.length)]
        $('.js-city-name').val(randomCity)
        handleWeather(randomCity)
    })
}

function watchForHelp() {
    $('.js-help-btn').click(function(e) {
        transitionHelp()
    })
}

//// Helper methods


function plotWeather(obj) {
    console.dir(obj)
}

function handleWeather(city) {
    var weather = fetchWeather(city)
    plotWeather(weather)
}

// return object containing weather factors required to visualize:
// temperature (T) in celsius and wind speed (S) in meters/second + direction (D) in degrees
function fetchWeather(city) {
    var cleanWeather = {};
    $.getJSON(API, 'q='+city+queryParameters, function(obj) {
        // Not all fetched objects have all the required keys
        cleanWeather.T = (obj.main.temp) ? obj.main.temp : defaultT;
        cleanWeather.S = (obj.wind.speed) ? obj.wind.speed : defaultS;
        cleanWeather.D = (obj.wind.deg) ? obj.wind.deg : defaultD;
    })

    return cleanWeather;
}

// Toggle help menu
function transitionHelp() {
    if($('.js-help-text').css('display') == 'none'){
            $('header').fadeOut('slow')
            $('.js-help-text').fadeIn('slow')
            $('.js-help-btn').attr('src', 'images/close.png')
        } else {
            $('.js-help-text').fadeOut("slow")
            $('header').fadeIn("slow")
            $('.js-help-btn').attr('src', 'images/help.png')
    }
}

$(function(){
    watchForSubmit()
    watchForRandom()
    watchForHelp()
})

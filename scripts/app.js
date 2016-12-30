//// Global variables

var queryParameters = '&units=metric&APPID=6f36f42e1677237f380a89ee3b72edec'
var API = 'https://api.openweathermap.org/data/2.5/weather'
var defaultT = 25;
var defaultS = 5;
var defaultD = 45;
// to account for the coordinate system of p5.js
var Dcorrection = 0;
var defaultCities = ["Kathmandu", "Lhasa", "İstanbul", "Pya", "Hokkaidō", 
                    "Lisbon", "Helsinki", "Osuna", "Northwich", "Villa del Rosario", 
                    "Santa Marta", "Leticia", "Cali", "Gibraltar"]

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
    var directioninRads = toRads(obj.D);
    setParticleParams(obj.S * Math.sin(directioninRads), obj.S * Math.cos(directioninRads), obj.D, obj.T)
    $('.js-output-weather').html('<p> Temperature:'+ obj.T + '&#176;  Wind Speed: ' + obj.S + 'm/s  Direction: ' + obj.D  +'&#176;</p>')

    $('#defaultCanvas0').show()

}

function handleWeather(city) {
    var weather = fetchWeather(city)
    plotWeather(weather)
}

// return object containing weather factors required to visualize:
// temperature (T) in celsius and wind speed (S) in meters/second + direction (D) in degrees                //TODO CHANGE AJAX TO getJSON check async
function fetchWeather(city) {
    var cleanWeather = {};
    $.ajax({
        async: false,
        method: 'POST',
        dataType: "json",
        url: API+'?q=' + city + queryParameters,
        success: function(obj) {
            console.dir(obj)
            cleanWeather.T = (obj.main.temp) ? obj.main.temp : defaultT;
            cleanWeather.S = (obj.wind.speed) ? obj.wind.speed : defaultS;
            cleanWeather.D = (obj.wind.deg) ? obj.wind.deg + Dcorrection : defaultD;
        },
        error: function(e) {alert(e)}
    })
    // $.getJSON(API, 'q=' + city + queryParameters, function(obj) {
    //     console.dir(obj)
    //     cleanWeather.T = (obj.main.temp) ? obj.main.temp : defaultT;
    //     cleanWeather.S = (obj.wind.speed) ? obj.wind.speed : defaultS;
    //     cleanWeather.D = (obj.wind.deg) ? obj.wind.deg + Dcorrection : defaultD;
    // })

    return cleanWeather
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

const CORS_WRAPPER = 'https://cors-anywhere.herokuapp.com/';
const API = 'http://api.openweathermap.org/data/2.5/weather';
const queryParameters = '&units=metric&APPID=6f36f42e1677237f380a89ee3b72edec';

let defaultT = 25;
let defaultS = 5;
let defaultD = 45;
// to account for the coordinate system of p5.js
let Dcorrection = 0;

let defaultCities = [
    "Kathmandu", "Lhasa", "İstanbul", "Pya", "Hokkaidō", "Lisbon", "Helsinki", "Osuna",
    "Northwich", "Villa del Rosario", "Santa Marta", "Leticia", "Cali", "Gibraltar", "Kabul",
    "Tirana", "Algiers", "Andorra la Vella", "Luanda", "Saint John", "Buenos Aires", "Yerevan",
    "Canberra", "Vienna", "Baku", "Nassau", "Manama", "Dhaka", "Bridgetown", "Minsk", "Brussels",
    "Belmopan", "Porto-Novo", "Thimphu", "La Paz", "Sucre", "Sarajevo", "Gaborone", "Brasilia",
    "Bandar Seri Begawan", "Sofia", "Ouagadougou", "Phnom Penh", "Yaounde", "Ottawa", "Praia",
    "Bangui", "N'Djamena", "Santiago", "Beijing", "Bogota", "Moroni", "Brazzaville", "Kinshasa",
    "San Jose", "Abidjan", "Zagreb", "Havana", "Nicosia", "Prague", "Copenhagen", "Djibouti",
    "Roseau", "Santo Domingo", "Dili", "Quito", "Cairo", "San Salvador", "Malabo", "Asmara",
    "Tallinn", "Addis Ababa", "Suva", "Helsinki", "Paris", "Libreville", "Banjul", "Tbilisi",
    "Berlin", "Accra", "Athens", "Saint George's", "Guatemala City", "Conakry", "Bissau",
    "Georgetown", "Port-au-Prince", "Tegucigalpa", "Budapest", "Reykjavik", "New Delhi", "Jakarta",
    "Tehran", "Baghdad", "Dublin", "Jerusalem*", "Rome", "Kingston", "Tokyo", "Amman", "Astana",
    "Nairobi", "Tarawa Atoll", "Pyongyang", "Seoul", "Pristina", "Kuwait City", "Bishkek",
    "Vientiane", "Riga", "Beirut", "Maseru", "Monrovia", "Tripoli", "Vaduz", "Vilnius",
    "Luxembourg", "Skopje", "Antananarivo", "Lilongwe", "Kuala Lumpur", "Male", "Bamako",
    "Valletta", "Majuro", "Nouakchott", "Port Louis", "Mexico City", "Chisinau",
    "Monaco", "Ulaanbaatar", "Podgorica", "Rabat", "Maputo", "Rangoon", "Windhoek",
    "Amsterdam", "Wellington", "Managua", "Niamey", "Abuja", "Oslo", "Muscat", "Islamabad",
    "Melekeok", "Panama City", "Port Moresby", "Asuncion", "Lima", "Manila", "Warsaw", "Doha",
    "Bucharest", "Moscow", "Kigali", "Basseterre", "Castries", "Kingstown", "Apia", "San Marino",
    "Sao Tome", "Riyadh", "Dakar", "Belgrade", "Victoria", "Freetown", "Singapore", "Bratislava",
    "Ljubljana", "Honiara", "Mogadishu", "Pretoria", "Cape Town", "Juba ", "Madrid", "Colombo",
    "Khartoum", "Paramaribo", "Mbabane", "Stockholm", "Bern", "Damascus", "Taipei", "Dushanbe",
    "Dodoma", "Bangkok", "Lome", "Nuku'alofa", "Port-of-Spain", "Tunis", "Ankara", "Ashgabat",
    "Kampala", "Kyiv", "Abu Dhabi", "London", "Washington", "Montevideo", "Tashkent", "Port-Vila",
    "Vatican City", "Caracas", "Hanoi", "Sanaa", "Lusaka", "Harare"];

//// Event Listeners
let watchForSubmit = () => {
    $('.js-city-form').on('click', '.js-city-submit', ev => {
        ev.preventDefault();
        if (!($('.js-city-name').val())) {
            $(".js-city-name").fadeOut('fast');
            $(".js-city-name").fadeIn('fast');
            return;
        }
        let inputCity = $('.js-city-name').val();
        handleWeather(inputCity);
    })
};

let watchForRandom = () => {
    $('.js-city-form').on('click', '.js-city-random', ev => {
        ev.preventDefault();
        let randomCity = defaultCities[Math.floor(Math.random() * defaultCities.length)];
        $('.js-city-name').val(randomCity);
        handleWeather(randomCity);
    })
};

let watchForHelp = () => $('.js-help-icon').click(_ => transitionHelp());

//// Helper methods
let plotWeather = obj => {
    let directioninRads = toRads(obj.D);
    setParticleParams(obj.S * Math.sin(directioninRads), obj.S * Math.cos(directioninRads), obj.D, obj.T);
    $('.js-output-weather').html(
        '<p> Temp:' + obj.T + '&#176;<br>Speed: ' +
        obj.S + 'm/s<br>Dir: ' + obj.D + '&#176;</p>');
};

let handleWeather = city => plotWeather(fetchWeather(city));

// return object containing weather factors required to visualize:
// temperature (T) in celsius and wind speed (S) in meters/second + direction (D) in degrees                //TODO CHANGE AJAX TO getJSON check async
let fetchWeather = city => {
    let cleanWeather = {};
    $.ajax({
        async: false,
        method: 'POST',
        dataType: "json",
        url: CORS_WRAPPER + API + '?q=' + city + queryParameters,
        success: res => {
            console.dir(res)
            cleanWeather.T = (res.main.temp) ? res.main.temp : defaultT;
            cleanWeather.S = (res.wind.speed) ? res.wind.speed : defaultS;
            cleanWeather.D = (res.wind.deg) ? res.wind.deg + Dcorrection : defaultD;
        },
        error: e => console.log(e)
    });

    return cleanWeather;
};


// Toggle help menu
let transitionHelp = () => {
    if ($('.js-help-text').css('display') == 'none') {
        $('header').fadeOut('slow');
        $('.js-output-weather').fadeOut('slow');
        $('.js-help-text').fadeIn('slow');
        $('.js-help-icon').attr('src', 'images/close.svg');
    } else {
        $('.js-help-text').fadeOut("slow");
        $('header').fadeIn("slow");
        $('.js-output-weather').fadeIn('slow');
        $('.js-help-icon').attr('src', 'images/help.svg');
    }
};

$(function () {
    watchForSubmit();
    watchForRandom();
    watchForHelp();
})

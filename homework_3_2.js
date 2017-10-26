var express = require('express');
var app = express();

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

var citiesYear = {
    5000: 'Lotopia',
    5100: 'Caspiana',
    5105: 'Indigo',
    6000: 'Paradise',
    7000: 'Flotilla'
  };

app.param('name', function(request, response,next){
    var city = parseCityName(request.params.name);
    request.cityName = city;

    next();
});

app.param('year', function(request, response, next){
    var yearParam = request.params.year;
    
    var year = isYearValid(yearParam);

    console.log(yearParam);
    console.log(year);

    if(year){
        request.yearParam = year;
        next();
    }else{
        response.status(400).json("Invalid format for year");
    }
});

app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json("City not found");
  }
});

app.get('/cities/year/:year', function(request, response) {
    var year = request.yearParam;
    var city = citiesYear[year];
  
    if(!city) {
      response.status(404).json("No City found for given year");
    } else {
      response.json("In " + year + ", " + city + " is created.");
    }
  });

function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
};

function isYearValid(value){
    var regexp = RegExp('/^d{4}$/');
    return regexp.test(value);
};

app.listen(3000);                                                                                                                                                                                                                                                                                                            

var express = require('express');
var app = express();

var cities = ['Caspiana', 'Indigo', 'Paradise'];

var citiesObj = {
    'Lotopia': 'Rough and mountainous',
    'Caspiana': 'Sky-top island',
    'Indigo': 'Vibrant and thriving',
    'Paradise': 'Lush, green plantation',
    'Flotilla': 'Bustling urban oasis'
  };

app.get('/cities', function(request, response){
  if(request.query.search){
    var filteredCities= citySearch(request.query.search);
    response.json(filteredCities);
  }
});


app.get('/cities/:name', function(request, response){
    var cityInfo = citiesObj[request.params.name];
    if(cityInfo){
        response.json(cityInfo);
    }else{
        response.status(404).json("City not found.");
    }
});


function citySearch(keyword){
    var regexp = RegExp(keyword, 'i');
    var result = cities.filter(function(city){
        return city.match(regexp);
    });

    return result;
};

app.listen(3000);
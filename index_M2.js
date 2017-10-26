var express = require('express');
var app = express();

var logger = require('./logger_M2');
app.use(logger);

// app.get("/", function(request,response){
//     response.sendFile(__dirname + '/public/index.html');
// });

app.use(express.static('public'));

app.get('/blocks', function(request, response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
});

app.use(function(request, response, next){
    if (request.path === "/cities"){
      next();
    } else {
      response.status(404).json("Path requested does not exist");
    }
  });
  
  app.get('/cities', function(request, response){
    var cities = ['Caspiana', 'Indigo', 'Paradise'];
    response.json(cities);
  });

app.listen(3000, function(){
    console.log("Application listening on port 3000...");
});
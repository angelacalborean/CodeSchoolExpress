var express =require('express');

const app = express();

app.get('/', function(request,response){
   // response.send('Hello world!');
   response.write('Hello World!');
   response.end();
});

app.get('/blocks', function(request,response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    //response.send(blocks);
    response.json(blocks);
});

app.get('/blocuri', function(request,response){    
    response.redirect(301,'/blocks');
});

app.get('/locations', function (request, response) {
    //var cities = ['Caspiana', 'Indigo', 'Paradise'];
    var cities = '<ul><li>Caspiana</li><li>Indigo</li></ul>';    
    response.send(cities);
  });
  

app.listen(3000, function(){
    console.log('Listening on port 3000');
});
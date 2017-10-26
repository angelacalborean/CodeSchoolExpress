var express = require('express');
var app = express();

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

var locations= {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Roatating': 'Penthouse'
};

app.param('name', function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    request.blockName = block;
    next();
});

app.get('/', function(request, response){
    response.redirect(302, './blocks');
});

app.get('/blocks', function(request, response){
    //var blocks1 = ['Fixed', 'Movable', 'Rotating'];

    if(request.query.limit >= 0 && request.query.limit < blocks.length){
        response.json(Object.keys(blocks.slice(0, request.query.limit)));
    }else{
        response.json(Object.keys(blocks));
    }
});

app.get('/blocks/:name', function(request,response){
    var name = request.blockName;    
    var description = blocks[name];

    if(!description){
        response.status(404).json('No description found for: ' + request.params.name);
    }else{
        response.json(description);
    }
});

app.get('/locations/:name', function(request,response){
    var name = request.blockName;    
    var description = locations[name];

    if(!description){
        response.status(404).json('No description found for: ' + request.params.name);
    }else{
        response.json(description);
    }
});

app.listen(3000, function(){
    console.log("Express module3 : listening on port 3000");
});
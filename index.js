var express = require('express');
var app = express();


var logger = require('./logger_M2');
app.use(logger);

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended:false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.use(express.static('public'));

app.param('name', function(request, response, next){
    var nameParam = request.params.name;
    var blockName = nameParam[0].toUpperCase() + nameParam.slice(1).toLowerCase();
    
    request.blockName = blockName;
    next();
});


app.post('/blocks', parseUrlEncoded, function(request, response){
    var newBlock= request.body;
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name);
});

app.delete('/blocks:/name', function(request, response){
    delete blocks[request.blockName];
    response.sendStatus(200);
});

app.get('/', function(request, response){
    response.json(Object.keys(blocks));
});

app.get('/blocks', function(request, response){
    if(request.query.limit >= 0 && request.query.limit < blocks.length){
        response.json(Object.keys(blocks.slice(0, request.query.limit)));
    }else{
        response.json(Object.keys(blocks));
    }
});

app.get('/blocks/:name', function(request, response){
    var description = blocks[request.blockName];
    if(description){
        response.json(description);
    }else{
        response.status(404).json('No description found for: ' + request.params.name);
    }
});


app.listen(3000, function(){
    console.log('Listening on port 3000...')
});
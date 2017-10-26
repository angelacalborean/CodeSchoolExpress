var express = require('express');
var app = express();

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);


app.listen(3000, function(){
    console.log('Listening on port 3000...')
});
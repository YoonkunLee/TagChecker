const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'source')));

app.get('/ping', function(req, res){
    return res.send('pong');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'source', 'index.html'))
});

app.listen(process.env.PORT || 8080);
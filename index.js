'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/' , function(req, res, next){
   res.sendFile(path.join(__dirname + '/public/index.html'));
});

io.on('connection',function(socket){
    socket.on('reaction',function(react){
        console.log('reaction: ' + react);
    });
});

http.listen(port, function(){
    console.log('Listen on port: ' + port);
});

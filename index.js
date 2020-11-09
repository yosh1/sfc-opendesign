'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/' , function(req, res){
   res.sendFile(__dirname + '/public/index.html');
});

io.on('connection',function(socket){
    console.log('connected');
});

http.listen(PORT, function(){
    console.log('Listen on port: ' + port);
});

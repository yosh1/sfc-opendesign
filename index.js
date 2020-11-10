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
    // 同時接続数
    let conNum = socket.client.conn.server.clientsCount;
    console.log('connection: ', conNum);
    io.sockets.emit('count', conNum);

    socket.on('data',function(data){
        let datas = []

        console.log(data);

        if (datas.length === 0){
            datas.push(data);
        } else if (datas.length === 1){
            if (data.uuid !== datas[i].uuid){
                datas.push(data)
            }
        } else{
            for (let i = 0; datas.length-1; i++){
                if (data.uuid !== datas[i].uuid){
                    if(datas.length == i){
                        datas.push(data)
                    }
                }
            }
        }

        console.log(datas);

    });
});

http.listen(port, function(){
    console.log('Listen on port: ' + port);
});

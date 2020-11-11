'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require('path');
const Obniz = require("obniz");
let obniz = new Obniz("76098301");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/' , function(req, res, next){
   res.sendFile(path.join(__dirname + '/public/index.html'));
});
obniz.onconnect = async function () {

let dataList = []
let happyCount = 0
let surprisedCount = 0

function initList(){
    dataList = []
    happyCount = 0
    surprisedCount = 0
}

setInterval(initList, 1000);


io.on('connection',function(socket){
    let conNum = socket.client.conn.server.clientsCount;
    // console.log('connection: ', conNum);

    socket.on('data',function(data){

        if (dataList.length === 0){
            dataList.push(data);
             checkFace(data);
        } else if (dataList.some(dataList => dataList.uuid === data.uuid)){
        } else {
            dataList.push(data);
             checkFace(data);
        }
    })

    function checkFace(face) {

    switch (face.emo) {
        case 'happy':
            happyCount++;
            moveObniz(happyCount);
            break;
        case 'surprised':
            surprisedCount++;
            moveObniz(surprisedCount);
            break;
        default:
            moveObniz();
            break;
    }
}

function moveObniz(count) {
    let led = obniz.wired("LED", { anode:0, cathode:1 } );
    // 過半数以上
    if (count > conNum / 2){
        obniz.getIO(0).output(true);
        obniz.getIO(1).output(false);
    }else{
        obniz.io0.end();
        obniz.io1.end();
    }
}
})

http.listen(port, function(){
    console.log('Listen on port: ' + port);
});

}

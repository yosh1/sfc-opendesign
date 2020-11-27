"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const path = require("path");
const Obniz = require("obniz");
const obniz = new Obniz("76098301");
const obnizIO = require("./obniz.js");

const cors = require('cors');

let dataList = [];
let happyCount = 0;
let surprisedCount = 0;

let dataNumJson = 0;
let happyCountJson = 0;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//接続数とハッピー数を返すapi（CORS許可されている)
app.get('/getHappyNum',cors(), (req, res) => {
  res.json({ dataNum: dataNumJson, happyCount:  happyCountJson});
});


http.listen(port, function () {
  console.log("Listen on port: " + port);
});

function initList() {

  //json用に値をセット
  dataNumJson = dataList.length;
  happyCountJson = happyCount;

  dataList = [];
  happyCount = 0;
  surprisedCount = 0;
}
setInterval(initList, 1000);

io.on("connection", function (socket) {
  let conNum = socket.client.conn.server.clientsCount;
  // console.log('connection: ', conNum);

  socket.on("data", function (data) {
    if (dataList.length === 0) {
      dataList.push(data);
      checkFace1(data);      

    } else if (dataList.some((dataList) => dataList.uuid === data.uuid)) {
      return;
    } else {
      dataList.push(data);
      checkFace1(data);

    }
  });

  function checkFace1(face) {

    switch (face.emo) {
      case "happy":
        happyCount++;
        checkFace(happyCount, "happy");
        break;
      case "surprised":
        surprisedCount++;
        checkFace(surprisedCount, "surprised");
        break;
      default:
        checkFace();
        break;
    }

  }

  function checkFace(count, emo) {

    // 過半数以上
    if (count > dataList.length / 2) {
      obnizShow(emo);
    } else {
      obnizShow("none");
    }
  }
});



obniz.onconnect = async function () {
  const happyLed = obniz.wired("LED", { anode: 2, cathode: 3 });
  const surprisedLed = obniz.wired("LED", { anode: 5, cathode: 4 });

};

function obnizShow(emoToka){
  if(obniz.connectionState != "connected") return;
  switch (emo) {
    case "happy":
      happyLed.on();
      surprisedLed.off();
      obnizIO.obnizStart();
      break;
    case "surprised":
      surprisedLed.on();
      happyLed.off();
      obnizIO.obnizStart();
      break;
    case "none":
      happyLed.off();
      surprisedLed.off();
      obnizIO.obnizStop();
      break;
    default:
      break;
  }
}



"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

let dataList = [];
let happyCount = 0;
let surprisedCount = 0;

function initList() {
  dataList = [];
  happyCount = 0;
  surprisedCount = 0;
}
setInterval(initList, 1000);

io.on("connection", function (socket) {

  socket.on("data", function (data) {
    if (dataList.length === 0) {
      dataList.push(data);
      checkFace(data);
    } else if (dataList.some((dataList) => dataList.uuid === data.uuid)) {
      return;
    } else {
      dataList.push(data);
      checkFace(data);
    }
  });

  function checkFace(face) {
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
      switch (emo) {
        case "happy":
          // ここでhappyLedをon / surprisedLedをoff
          break;
        case "surprised":
          // ここでhappyLedをoff / surprisedLedをon
          break;
        default:
          break;
      }
      // IOをON
    } else {
      // ここでhappyLed / surprisedLedをoff
      // IOをoffに
    }
  }
});

http.listen(port, function () {
  console.log("Listen on port: " + port);
});

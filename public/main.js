var socket = io();
socket.on('connect', function () {
    console.log("Socket connected: " + socket.connected);
});


// もろもろの準備
const video = document.getElementById("video");           // video 要素を取得
const canvas = document.getElementById("canvas");         // canvas 要素の取得
const context = canvas.getContext("2d");                  // canvas の context の取得

var dat = document.getElementById("dat");
var denden = document.getElementById("denden");

const dendenImg = ["dendenAngry.png", "dendenDisgusted.png", "dendenFear.png", "dendenSad.png", "dendenSuprised.png", "dendenHappy.png", "dendenNormal.png"];

// getUserMedia によるカメラ映像の取得
var media = navigator.mediaDevices.getUserMedia({       // メディアデバイスを取得
  video: {facingMode: "user"},                          // カメラの映像を使う（スマホならインカメラ）
  audio: false                                          // マイクの音声は使わない
});
media.then((stream) => {                                // メディアデバイスが取得できたら
  video.srcObject = stream;                             // video 要素にストリームを渡す
});

// clmtrackr の開始
var tracker = new clm.tracker();  // tracker オブジェクトを作成
tracker.init(pModel);             // tracker を所定のフェイスモデル（※）で初期化
tracker.start(video);             // video 要素内でフェイストラッキング開始

// 感情分類の開始
var classifier = new emotionClassifier();               // ★emotionClassifier オブジェクトを作成
classifier.init(emotionModel);                          // ★classifier を所定の感情モデル（※2）で初期化

// 描画ループ
function drawLoop() {
  requestAnimationFrame(drawLoop);                      // drawLoop 関数を繰り返し実行

  //顔の位置データ処理
  var positions = tracker.getCurrentPosition();         // 顔部品の現在位置の取得
  showData(positions);                                  // データの表示

  //顔の感情処理
  var parameters = tracker.getCurrentParameters();      // ★現在の顔のパラメータを取得
  var emotion = classifier.meanPredict(parameters);     // ★そのパラメータから感情を推定して emotion に結果を入れる
  showEmotionData(emotion);                             // ★感情データを表示


  context.clearRect(0, 0, canvas.width, canvas.height); // canvas をクリア
  tracker.draw(canvas);                                 // canvas にトラッキング結果を描画

    socket.emit('reaction', emotion);
}
drawLoop();                                             // drawLoop 関数をトリガー

// 顔部品（特徴点）の位置データを表示する showData 関数
function showData(pos) {
  var str1 = "";                                         // データの文字列を入れる変数
  for(var i = 0; i < pos.length; i++) {                 // 全ての特徴点（71個）について
    str1 += "点" + i + ": ("
         + Math.round(pos[i][0]) + ", "                 // X座標（四捨五入して整数に）
         + Math.round(pos[i][1]) + ")<br>";             // Y座標（四捨五入して整数に）

        //コンソールに表示
        //  console.log("点" + i + "(" + Math.round(pos[i][0]) + "," + Math.round(pos[i][1]) + ")");
  }
  // var dat1 = document.getElementById("dat1");             // データ表示用div要素の取得
  // dat1.innerHTML = str1;                                  // データ文字列の表示
}

// ★感情データの表示
function showEmotionData(emo) {
  var str2 ="";                                          // データの文字列を入れる変数
  for(var i = 0; i < emo.length; i++) {                 // 全ての感情（6種類）について
    str2 += emo[i].emotion + ": "                        // 感情名
         + emo[i].value.toFixed(1) + "<br>";            // 感情の程度（小数第一位まで）
  }
  dat.innerHTML = str2;                                  // データ文字列の表示
}

//電伝虫の顔を感情によって変える
function changeDendenFace(emo){
    var maxEmo = 6;
    var maxEmoValue = 0;
    for(var i = 0; i < emo.length; i++){
        if(maxEmoValue < emo[i].value.toFixed(1)) {
            maxEmoValue = emo[i].value.toFixed(1);
            maxEmo = i;
        }
    }
    denden.src = '/images/' + dendenImg[maxEmo];
    console.log(emo[maxEmo].emotion + " : " + maxEmo);
    // denden.src = "images/dendenAngry.png";

}


// function sendData(data){
//   const targetUrl = 'https://sfc-opendesign.herokuapp.com/post';

//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function()
//     {
//         var READYSTATE_COMPLETED = 4;
//         var HTTP_STATUS_OK = 200;

//         if( this.readyState == READYSTATE_COMPLETED
//          && this.status == HTTP_STATUS_OK )
//         {
//             console.log( this.responseText );
//         }
//     }
//   xhr.open( 'POST', targetUrl);
//   xhr.setRequestHeader( 'Content-Type', 'application/json');
//   xhr.send(JSON.stringify(data));
// }

// function generateData(emo){
//   var sendData = "{";
//   for(var i = 0; i < emo.length; i++) {                 // 全ての感情（6種類）について
//     sendData += "\"" + emo[i].emotion + "\":" + emo[i].value.toFixed(1);
//     if(i == emo.length-1) continue;
//     sendData +=  ",";
//   }
//   sendData += "}"
//   return sendData;
// }

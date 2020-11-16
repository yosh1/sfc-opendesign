'use strict';

exports.obnizStart = function(){
    obniz.onconnect = async function () {
        obniz.getIO(0).output(true);
        obniz.getIO(1).output(false);
    }
}

exports.obnizStop = function() {
    obniz.onconnect = async function () {
        obniz.io0.end();
        obniz.io1.end();
    }
}

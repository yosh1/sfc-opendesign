'use strict';

const Obniz = require("obniz");
let obniz = new Obniz("76098301");

function obnizStart(){
    obniz.onconnect = async function () {
        obniz.io0.output(true);
        obniz.io1.output(true);
    }
}

function obnizStop() {
    obniz.onconnect = async function () {
        obniz.io0.end();
        obniz.io1.end();
    }
}

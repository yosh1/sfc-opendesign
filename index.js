'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/' , function(req, res){
   res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log('Listen on port: ' + port);

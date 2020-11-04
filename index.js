'use strict';

const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

// import chirimen
// https://tutorial.chirimen.org/raspi/nodejs

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);

const port = process.env.PORT || 3000;

// GET http://localhost:3000/
app.get('/',function(req,res){
    res.json({
        message:"Hello,world"
    });
});

// GET http://localhost:3000/post
app.post('/post', (req, res) => {
  console.log(req.body);
  res.send(req.json);
  res.json({
        message: req.body
    });
});

app.listen(port);
console.log('Listen on port: ' + port);

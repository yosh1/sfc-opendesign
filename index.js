'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.send("Received POST Data!");
});

app.listen(port);
console.log('listen on port ' + port);

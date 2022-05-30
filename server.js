require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3001;
const DB_CONN = process.env.DB_CONN;



app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(DB_CONN, (err, client) => {
    if(err) return console.log(err);
    console.log(`Database connected`)
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', (req, res) => {
    console.log(req.body);
})

app.listen(PORT, function (){
    console.log(`Now listening on ${PORT}`)
});

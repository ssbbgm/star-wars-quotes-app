require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cli = require('nodemon/lib/cli');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3001;
const DB_CONN = process.env.DB_CONN;


app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(DB_CONN)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes');
        app.use()
        app.get()
        app.post()
        app.listen()
    })
    .catch(error => console.error(error));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', (req, res) => {
    console.log(req.body);
})

app.listen(PORT, function (){
    console.log(`Now listening on ${PORT}`)
});

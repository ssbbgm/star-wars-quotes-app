require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('express/lib/response');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3001;
const DB_CONN = process.env.DB_CONN;


MongoClient.connect(DB_CONN)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes');
        const quotesCollection = db.collection('quotes');

        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static('public'))
        app.use(bodyParser.json());

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', { quotes: results })
            })
            .catch(error => console.log(error))
        });

        app.put('/quotes', (req, res) => {
            console.log(req.body)
        })
        
        app.post('/quotes', (req, res) => {
                quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        
        app.listen(PORT, function (){
            console.log(`Now listening on ${PORT}`)
        });
    })
    .catch(error => console.error(error));


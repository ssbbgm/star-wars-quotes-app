require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('express/lib/response');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3001;
const DB_CONN = "mongodb+srv://user825:marij2004@cluster0.lyn7zl3.mongodb.net/?retryWrites=true&w=majority";


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
           quotesCollection.findOneAndUpdate(
               { name : 'Yoda'},
               {
                   $set: {
                       name: req.body.name,
                       quote: req.body.quote
                   }
               },
               {
                   upsert: true
               }
           )
           .then(result => {
               res.json('Success')
           })
           .catch(error => console.error(error))
        })
        
        app.post('/quotes', (req, res) => {
                quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name}
            )
            .then(result => {
                if(result.deletedCount === 0){
                    return res.json('No quote to delete')
                }
                res.json('Deleted Darth Vader\'s quote')
            })
            .catch(error => console.log(error))
        })
        
        app.listen(PORT, function (){
            console.log(`Now listening on ${PORT}`)
        });
    })
    .catch(error => console.error(error));


console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
require('dotenv').config();
const connectionString = process.env.ATLAS_URI;


const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('ejercicio-2')
    const quotesCollection = db.collection('usuarios')
    
    app.set('view engine', 'ejs')
    
    app.listen(3000, function(){
      console.log('Listening on 3000')
    })
    
    app.use(bodyParser.urlencoded({ extended: true }))
    
    app.get('/', (req, res) => {
      db.collection('usuarios').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
        console.log(results);
      })
      .catch(error => console.error(error))
      
    })
    
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
          console.log(result)
        })
        .catch(error => console.error(error))
    })
    
  })
  .catch(error => console.error(error))

  
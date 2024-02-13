// Create web server
const express = require('express');
const app = express();

// Set up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Set up MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  db = client.db('star-wars-quotes');
});

// Set up server
app.listen(3000, () => {
  console.log('May the 4th be with you, on port 3000');
});

// Create a GET endpoint
app.get('/', (req, res) => {
  res.send('May the 4th be with you');
});

// Create a POST endpoint
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('Saved to database');
    res.redirect('/');
  });
});

// Create a GET endpoint to retrieve data from the database
app.get('/quotes', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) {
      return console.log(err);
    }
    res.send(result);
  });
});

// Create a PUT endpoint to update data in the database
app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate(
    { name: 'Yoda' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      sort: { _id: -1 },
      upsert: true
    },
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    }
  );
});

// Create a DELETE endpoint to remove data from the database
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete(
    { name: req.body.name },
    (err, result) => {
      if (err) {
        return res.send(500, err);
      }
      res.send('A Darth Vader quote got deleted');
    }
  );
});
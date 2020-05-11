const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/pokemon');
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.once('open', function () {
  console.info('Successfully connected to the database');
});

let pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String
});

let pokemon = mongoose.model("pokemon", pokemonSchema);

router.get('/', function (req, res) {
  res.send('API works!');
});
router.post('/addPokemon', function (req, res) {
  console.log(req.body);
  let newPokemon = new pokemon(req.body);
  newPokemon.save()
    .then(item => {
      res.send("item saved to database");
    })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});
router.get('/getAllPokemon', function (req, res) {
  pokemon.find({}, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
module.exports = router;

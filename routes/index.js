var express = require('express');
var router = express.Router();

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://test:test@ds143532.mlab.com:43532/basketball_reference", function(err, db) {
  if(!err) {
    console.log("We are connected");
  } else {
  	console.log('error on connection')
  }

	router.get('/states', function(req, res, next) {
		var collection = db.collection('states');
		collection.find().toArray(function(e, result){
			res.jsonp(result)
		})	
	});

	router.get('/colleges/:state', function(req, res, next){
		var collection = db.collection('colleges');
		collection.find({'state_abbreviation': req.params.state}).toArray(function(e, result){
			res.jsonp(result)
		})
	})

	router.get('/players/college/:college', function(req, res, next){
		var collection = db.collection('players')
		collection.find({'college': req.params.college}).toArray(function (e, result){
			res.jsonp(result)
		})
	})

	router.get('/players/name/:name', function(req, res, next){
		var collection= db.collection('players')
		collection.findOne({name:{$regex: 'kareem abdul-jabbar', $options: 'i'}}, function(e, result){
			res.jsonp(result)
		})
	})

	router.get('/players/:pid', function(req, res, next){
	  	var collection = db.collection('basketball_reference')
			collection.findOne({'player_id': req.params.pid}, function (e, result){
				res.jsonp(result)
		})
	})



});


module.exports = router;

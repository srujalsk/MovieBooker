var express = require('express');
var movie = require('../models/movies');

/* GET /Movies = Return Movies List */
exports.GetMovieslist = function(req,res,next){
  movie.find(function (err, movies) {
    if (err) return next(err);
    res.json(movies);
  });
}

/* POST /Movies = Add New Movie to List */
exports.PostMovie = function(req,res,next){
  movie.create(req.body,function(err,post){
    if(err)
    {
      console.error("Error Occured when posting...",err);
      return next(err);
    }
    res.json(post);
  });
}


/* GET /Movies/:id = Return Movies By ID */
exports.GetMovieByID = function(req, res, next){
  movie.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}


/* PUT /Movies/:id = Update Movies By ID */
exports.UpdateMovieByID = function(req,res,next){
  movie.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

/* DELETE /Movies/:id = Delete Movies By ID */
exports.DeleteMovieByID = function(req,res,next){
  movie.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

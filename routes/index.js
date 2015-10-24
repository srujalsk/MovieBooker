var movie = require('../models/movies');
var movies_list = [];

/* GET home page. */
exports.index = function(req, res){
  res.render('index', {
    title: 'MovieBooker'
    //movies: GetMoviesList()
  });
};

/*function GetMoviesList()
{
  movie.find().exec(function (err, movies) {
    movies_list = movies;
  });
  return movies_list;
}*/

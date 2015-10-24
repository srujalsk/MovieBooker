var movie = require('../models/movies');
var movies_list = [];

/* GET home page. */
exports.index = function(req, res){
  res.render('index', {
    title: 'MovieBooker'
  });
};

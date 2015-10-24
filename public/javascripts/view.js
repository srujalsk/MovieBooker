
var app = angular.module("moviebookerapp",['ngRoute', 'ngResource']);
var seatCost = 0;

app.config(['$routeProvider',function ($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'/main.html',
      controller: 'mainController'
    });

  $routeProvider
    .when('/book/:id',{
      templateUrl:'/book.html',
      controller: 'bookingController'
    });

  $routeProvider
    .when('/NewMovie',{
      templateUrl:'/NewMovie.html',
      controller: 'NewMovieController'
    });
}]);

app.directive('fileread', [function () {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                scope.file = files[0];
                scope.$apply();
            });
        }
    }
}]);

app.factory('Movies', ['$resource', function($resource){
  return $resource('/movies/:id', { id: '@_id' },{
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);

app.controller("mainController",["$scope","Movies",mainController]);
app.controller("bookingController",["$scope","$routeParams","Movies",bookingController]);
app.controller("NewMovieController",["$scope","Movies",NewMovieController]);

function NewMovieController($scope, Movies)
{
  $scope.movie = new Movies();
  $scope.poster = [];

  var bookingsList = [];
  $scope.saveMovie = function(){
    console.log($scope.movie);
    CreateBookingObjects();
    if(!$scope.movie.name || $scope.movie.name.length < 1 ||
       !$scope.movie.description || $scope.movie.name.description < 1 ||
       !$scope.movie.rating || $scope.movie.name.rating < 1)
       {
         return;
       }
      $scope.movie.booking = CreateBookingObjects();
      GetPosterImageAndSave($scope);
  }
}

function SaveMovieObject($scope)
{
  console.log("Saving Data...");
  $scope.movie.$save(function() {
    console.log("Data Saved Sucessfully...");
    $scope.movie.name = "";
    $scope.movie.description = "";
    $scope.movie.rating = "";
    $scope.movie.poster = "";
  });
}

function GetPosterImageAndSave($scope)
{
  //console.log($scope.file);
	var fileToLoad = $scope.file;
	var fileReader = new FileReader();
  //console.log("File Reader Object Created...");
	fileReader.onload = function(fileLoadedEvent)
	{
    $scope.movie.poster = btoa(fileLoadedEvent.target.result);
    //console.log($scope.movie.poster);
    SaveMovieObject($scope);
	};
	fileReader.readAsBinaryString(fileToLoad);
}

function CreateBookingObjects()
{
  var bookings = [];

  //08:30 PM Time
  var booking_0830pm = new booking("08:30 PM");

  //11:00 PM Time
  var booking_1100pm = new booking("11:00 PM");

  bookings.push(booking_0830pm);
  bookings.push(booking_1100pm);

  console.log(bookings);
  return bookings;
}

function booking(showTime){
  this.show_time = showTime;
  this.show_seats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

function mainController($scope, Movies)
{
  $scope.message = "Main";
  Movies.query(function(data){
    $scope.movies = data;
  });
}

function bookingController($scope,$routeParams,Movies)
{
  seatCost = 0;
  $scope.movieId = $routeParams.id;
  $scope.movie = Movies.get({ id: $scope.movieId});
  $scope.SeatClicked = SeatClicked;
  $scope.isAvailable = isAvailable;
  $scope.isNotAvailable = isNotAvailable;
  $scope.isBooked = isBooked;
  $scope.confirmBooking = function(movie){
    console.log(movie);
    $scope.movie = updateBookingStatustoNotAvailable(movie);
    console.log($scope.movie);
    $scope.movie.$update(function(){
      alert("Congratulation! your seats has been booked...")
    });
  }
  $scope.finalCost = function(){
    return seatCost;
  }
}

function isAvailable(movie,showId,seatId)
{
  for(var i=0;i<movie.booking.length;i++)
  {
    var show = movie.booking[i];
    if(show._id == showId)
    {
      var seat = show.show_seats[seatId];
      if(seat == 0)
      {
        return true;
      }
      else {
        return false;
      }
    }
  }
}

function isNotAvailable(movie,showId,seatId)
{
  for(var i=0;i<movie.booking.length;i++)
  {
    var show = movie.booking[i];
    if(show._id == showId)
    {
      var seat = show.show_seats[seatId];
      if(seat == 1)
      {
        return true;
      }
      else {
        return false;
      }
    }
  }
}

function isBooked(movie,showId,seatId)
{
  for(var i=0;i<movie.booking.length;i++)
  {
    var show = movie.booking[i];
    if(show._id == showId)
    {
      var seat = show.show_seats[seatId];
      if(seat == 2)
      {
        return true;
      }
      else {
        return false;
      }
    }
  }
}

function SeatClicked(movie,showId,seatId,SeatStatus)
{
  if(SeatStatus == 1)
  {
    return;
  }

  for(var i=0;i<movie.booking.length;i++)
  {
    var show = movie.booking[i];
    if(show._id == showId)
    {
      if(show.show_seats[seatId] == 0)
      {
        show.show_seats[seatId] = 2;
        seatCost += 100;
      }
      else {
        show.show_seats[seatId] = 0;
        seatCost -= 100;
      }
    }
  }
}

function updateBookingStatustoNotAvailable(movie){
  for(var i=0;i<movie.booking.length;i++)
  {
    var show = movie.booking[i];
    for(var j=0;j<show.show_seats.length;j++)
    {
      if(show.show_seats[j] == 2)
      {
        show.show_seats[j] = 1;
      }
    }
  }
  return movie;
}

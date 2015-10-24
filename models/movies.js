var common_types = require('../common/CommonTypes');
var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, default: '' },
  description: { type: String, required: true, default: '' },
  rating: { type: Number, required: true },
  poster: {type: String, default: ''},
  created_on: { type: Date, default: Date.now },
  released_on: { type: Date, default: Date.now },
  released_off: { type: Date, default: Date.now },
  booking: [{
    show_time: {type: String, default: Date.now},
    show_seats: {type: Array, default: [
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available,
    common_types.SeatStatus.Available]
    },
  }],
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Movies', MovieSchema);

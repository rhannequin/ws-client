;(function(){
  'use strict';

  var $             = require('jquery')
    , _             = require('lodash')
    , apiRequest    = require('./api')
    , placeTemplate = _.template($('#js-index-place').html())
    , $placeholders = $('.row.placeholders')

  apiRequest('/places').done(displayPlaces)

  function displayPlaces(dataP) {
    var places = dataP.data
      , str = ''
    $.each(places, function(i, place) {
      str += placeTemplate(place)
    })
    $placeholders.html(str)
  }

})()

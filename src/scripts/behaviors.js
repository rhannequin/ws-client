/*global google:false */
'use strict';

var $ = require('jquery')
  , selectors = require('./selectors')
  , findInput = selectors.findInput

module.exports = {
    placesList: placesList
  , showPlace: showPlace
  , addPlaceForm: addPlaceForm
}

function placesList() {
  var loaders = require('./loaders')
    , $filterForm = $('.places-form-filter')
  $filterForm.on('submit', function(e) {
    var $input
    e.preventDefault()
    $input = $(e.currentTarget).find('input')
    loaders.loadPlaces($input.val())
  })
}

function showPlace(place) {
  showMap('place-map', place.latitude, place.longitude, place.name, true)
}

function addPlaceForm() {
  var loaders = require('./loaders')
    , $form = $('form.add-place')
  loaders.loadTownsSelect()
  findInput($form, 'address').on('change', function() {
    getLatLngFromAddress($(this).val(), function(lat, lng) {
      findInput($form, 'latitude').val(lat)
      findInput($form, 'longitude').val(lng)
      showMap('place-map', lat, lng, "Place's address", true)
    })
  })
  $form.on('submit', function(e) {
    e.preventDefault()
    loaders.loadAddPlace(buildPlaceFormObj($form))
  })
}


// Private

function showMap(htmlId, lat, lng, name, showMarker) {
  var latLng = new google.maps.LatLng(lat, lng)
    , mapOptions = {
          center: latLng
        , zoom: 15
      }
    , map
  map = new google.maps.Map(document.getElementById(htmlId), mapOptions)
  if(typeof name !== 'undefined' && showMarker) {
    new google.maps.Marker({
        position: latLng
      , map: map
      , title: name
    })
  }
}

function buildPlaceFormObj($form) {
  return {
      name: findInput($form, 'name').val()
    , description: findInput($form, 'description').val()
    , address: findInput($form, 'address').val()
    , latitude: findInput($form, 'latitude').val()
    , longitude: findInput($form, 'longitude').val()
    , town_id: findInput($form, 'town_id', 'select').val()
  }
}

function getLatLngFromAddress(address, cb) {
  new google.maps.Geocoder().geocode({ address: address }, function(results) {
    if(results.length > 0) {
      var location = results[0].geometry.location
      cb(location.k, location.A)
    }
  })
}

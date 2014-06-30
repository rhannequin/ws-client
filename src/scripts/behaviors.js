/*global google:false */
'use strict';

var $ = require('jquery')
  , selectors = require('./selectors')
  , findInput = selectors.findInput

module.exports = {
    placesList: placesList
  , showPlace: showPlace
  , addPlaceForm: addPlaceForm
  , addCommentForm: addCommentForm
  , addTownForm: addTownForm
  , addCountryForm: addCountryForm
}

function placesList() {
  var loaders = require('./loaders')
    , $filterForm = $('.places-form-filter')
    , $townSortForm = $('form.js-sort-by-town')
    , $countrySortForm = $('form.js-sort-by-country')
  $filterForm.on('submit', function(e) {
    var filter
    e.preventDefault()
    filter = {
        type: 'filter'
      , val: $(e.currentTarget).find('input').val()
    }
    loaders.loadPlaces(filter)
  })
  $townSortForm.find('select').on('change', sortEvent)
  $countrySortForm.find('select').on('change', sortEvent)
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

function addCommentForm() {
  var loaders = require('./loaders')
    , $form = $('form.add-comment')
  $form.on('submit', function(e) {
    e.preventDefault()
    loaders.loadAddComment(buildCommentFormObj($form))
  })
}

function addTownForm() {
  var loaders = require('./loaders')
    , $form = $('form.add-town')
  loaders.loadCountriesSelect()
  $form.on('submit', function(e) {
    e.preventDefault()
    loaders.loadAddTown(buildTownFormObj($form))
  })
}

function addCountryForm() {
  var loaders = require('./loaders')
    , $form = $('form.add-country')
  $form.on('submit', function(e) {
    e.preventDefault()
    loaders.loadAddCountry(buildCountryFormObj($form))
  })
}


// Private

function sortEvent(e) {
  var loaders = require('./loaders')
    , $el = $(e.currentTarget)
    , sort = {
        type: 'sort'
      , cat: $el.parents('form').data('cat')
      , item: $el.val()
    }
  loaders.loadPlaces(sort)
}

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

function buildCommentFormObj($form) {
  return {
      author: findInput($form, 'author').val()
    , mark: parseInt(findInput($form, 'mark', 'select').find('option:selected').val(), 10)
    , text: findInput($form, 'text', 'textarea').val()
    , placeId: parseInt(findInput($form, 'place_id').val(), 10)
  }
}

function buildTownFormObj($form) {
  return {
      name: findInput($form, 'name').val()
    , population: findInput($form, 'population').val()
    , country_id: findInput($form, 'country_id', 'select').val()
  }
}

function buildCountryFormObj($form) {
  return {
      name: findInput($form, 'name').val()
    , code: findInput($form, 'code').val()
    , continent: findInput($form, 'continent').val()
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

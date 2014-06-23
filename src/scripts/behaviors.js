/*global google:false */
'use strict';

var $ = require('jquery')

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
  var latLng = new google.maps.LatLng(place.latitude, place.longitude)
    , mapOptions = {
          center: latLng
        , zoom: 15
      }
    , map
  map = new google.maps.Map(document.getElementById('place-map'), mapOptions)
  new google.maps.Marker({
      position: latLng
    , map: map
    , title: place.name
  })
}

function addPlaceForm() {
  var loaders = require('./loaders')
    , $form = $('form.add-place')
    , place
  $form.on('submit', function(e) {
    e.preventDefault()
    place = {
        name: $form.find("input[name$='name']").val()
      , description: $form.find("input[name$='description']").val()
      , address: $form.find("input[name$='address']").val()
      , latitude: $form.find("input[name$='latitude']").val()
      , longitude: $form.find("input[name$='longitude']").val()
      , town_id: $form.find("input[name$='town_id']").val()
    }
    loaders.loadAddPlace(place)
  })
}

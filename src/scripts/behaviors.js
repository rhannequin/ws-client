'use strict';

var $ = require('jquery')

module.exports = {
    placesList: placesList
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

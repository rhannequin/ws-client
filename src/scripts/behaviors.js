'use strict';

var $ = require('jquery')

module.exports = {
  placesList: placesList
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

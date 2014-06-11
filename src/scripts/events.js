'use strict';

var $ = require('jquery')
  , loaders = require('./loaders')

module.exports = {
  launch: launch
}

function launch() {
  $('body').on('click', '.js-place-item', showPlaceEvt)
  $('body').on('click', '.js-town-item', showTownEvt)
}

function showPlaceEvt(e) {
  var href
  e.preventDefault()
  href = $(e.currentTarget).attr('href')
  loaders.loadPlace(href)
}

function showTownEvt(e) {
  var href
  e.preventDefault()
  href = $(e.currentTarget).attr('href')
  console.log('Town url', href)
}

'use strict';

var $ = require('jquery')
  , loaders = require('./loaders')

module.exports = {
  launch: launch
}

function launch() {
  // Sidebar
  $('.nav-sidebar').find('a.js-sidebar').on('click', showFromSidebarEvt)

  $('body').on('click', '.js-place-item', showPlaceEvt)
  $('body').on('click', '.js-town-item', showTownEvt)
}

function showFromSidebarEvt(e) {
  e.preventDefault()
  var href = $(e.currentTarget).attr('href')
  switch(href) {
    case '/places':
      loaders.loadPlaces()
      break
    case '/towns':
      loaders.loadTowns()
      break
    default:
      loaders.loadPlaces()
  }
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

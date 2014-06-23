'use strict';

var $ = require('jquery')
  , loaders = require('./loaders')
  , renderers = require('./renderers')

module.exports = {
  launch: launch
}

function launch() {
  // Menu
  $('.nav-sidebar').find('a.js-sidebar').on('click', showFromMenuEvt)
  $('.navbar-nav').find('a.js-navbar').on('click', showFromMenuEvt)

  // Lists
  $('body').on('click', '.js-place-item', showPlaceEvt)
  $('body').on('click', '.js-town-item', showTownEvt)
  $('body').on('click', '.js-country-item', showCountryEvt)

  // Add
  $('body').on('click', '.js-place-add-item', addPlaceEvt)
}

function showFromMenuEvt(e) {
  e.preventDefault()
  var href = $(e.currentTarget).attr('href')
  switch(href) {
    case '/places':
      loaders.loadPlaces()
      break
    case '/towns':
      loaders.loadTowns()
      break
    case '/countries':
      loaders.loadCountries()
      break
    default:
      loaders.loadHome()
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
  loaders.loadTown(href)
}

function showCountryEvt(e) {
  var href
  e.preventDefault()
  href = $(e.currentTarget).attr('href')
  loaders.loadCountry(href)
}

function addPlaceEvt(e) {
  var href
  e.preventDefault()
  href = $(e.currentTarget).attr('href')
  renderers.renderAddPlace()
}

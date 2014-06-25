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
  $('body').on('click', '.js-comment-add-item', addCommentEvt)
}

function showFromMenuEvt(e) {
  e.preventDefault()
  var href = $(e.currentTarget).attr('href')
  switch(href) {
    case '/places':
      loaders.loadPlaces()
      break
    case '/places/add':
      renderers.renderAddPlace()
      break
    case '/towns':
      loaders.loadTowns()
      break
    case '/towns/add':
      renderers.renderAddTown()
      break
    case '/countries':
      loaders.loadCountries()
      break
    case '/countries/add':
      renderers.renderAddCountry()
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
  e.preventDefault()
  renderers.renderAddPlace()
}

function addCommentEvt(e) {
  var id
  e.preventDefault()
  id = $(e.currentTarget).data('placeid')
  renderers.renderAddComment(id)
}

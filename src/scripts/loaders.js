'use strict';

var apiRequest = require('./api')
  , renderers = require('./renderers')
  , selectors = require('./selectors')
  , $loader = selectors.gifLoader

module.exports = {
    loadHome: loadHome
  , loadPlaces: loadPlaces
  , loadPlace: loadPlace
  , loadAddPlace: loadAddPlace
  , loadTowns: loadTowns
  , loadTown: loadTown
  , loadAddTown: loadAddTown
  , loadTownsSelect: loadTownsSelect
  , loadCountries: loadCountries
  , loadCountry: loadCountry
  , loadCountriesSelect: loadCountriesSelect
}


function loadHome() {
  $loader().show()
  renderers.renderHome()
}


// PLACES

function loadPlaces(filter) {
  var url = '/places'
  if(typeof filter !== 'undefined' && filter.length) {
    url += '?f=' + filter
  }
  $loader().show()
  apiRequest(url).done(renderers.renderPlaces)
}

function loadPlace(url) {
  $loader().show()
  apiRequest(url).done(renderers.renderPlace)
}

function loadAddPlace(place) {
  $loader().show()
  apiRequest('/places', 'POST', {place: place}).done(loadPlaceFromAdd)
}


// TOWNS

function loadTowns() {
  $loader().show()
  apiRequest('/towns').done(renderers.renderTowns)
}

function loadTown(url) {
  $loader().show()
  apiRequest(url).done(renderers.renderTown)
}

function loadAddTown(town) {
  apiRequest('/towns', 'POST', {town: town}).done(loadTownFromAdd)
}

function loadTownsSelect() {
  apiRequest('/towns').done(renderers.renderTownsSelect)
}


// COUNTRIES

function loadCountries() {
  $loader().show()
  apiRequest('/countries').done(renderers.renderCountries)
}

function loadCountry(url) {
  $loader().show()
  apiRequest(url).done(renderers.renderCountry)
}

function loadCountriesSelect() {
  apiRequest('/countries').done(renderers.renderCountriesSelect)
}


// Private

function loadPlaceFromAdd(dataP) {
  var id = dataP.data.place_id
  loadPlace('/places/' + id)
}

function loadTownFromAdd(dataT) {
  var id = dataT.data.town_id
  loadTown('/towns/' + id)
}

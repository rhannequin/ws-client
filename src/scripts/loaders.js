'use strict';

var apiRequest = require('./api')
  , renderers = require('./renderers')
  , selectors = require('./selectors')
  , $loader = selectors.gifLoader

module.exports = {
    loadHome: loadHome
  , loadPlaces: loadPlaces
  , loadPlace: loadPlace
  , loadTowns: loadTowns
  , loadTown: loadTown
}


function loadHome() {
  $loader().show()
  renderers.renderHome()
}


// PLACES

function loadPlaces() {
  $loader().show()
  apiRequest('/places').done(renderers.renderPlaces)
}

function loadPlace(url) {
  $loader().show()
  apiRequest(url).done(renderers.renderPlace)
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

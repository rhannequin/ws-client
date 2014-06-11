'use strict';

var apiRequest = require('./api')
  , renderers = require('./renderers')
  , selectors = require('./selectors')
  , $loader = selectors.gifLoader

module.exports = {
    loadPlaces: loadPlaces
  , loadPlace: loadPlace
}

function loadPlaces() {
  $loader().show()
  apiRequest('/places').done(renderers.renderPlaces)
}

function loadPlace(url) {
  $loader().show()
  apiRequest(url).done(renderers.renderPlace)
}

'use strict';

var $ = require('jquery')
  , apiRequest = require('./api')
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
  , loadAddComment: loadAddComment
  , loadAddTown: loadAddTown
  , loadTownsSelect: loadTownsSelect
  , loadCountries: loadCountries
  , loadCountry: loadCountry
  , loadAddCountry: loadAddCountry
  , loadCountriesSelect: loadCountriesSelect
}


function loadHome() {
  $loader().show()
  renderers.renderHome()
}


// PLACES

function loadPlaces(params) {
  var url = '/places'
  if(typeof params !== 'undefined') {
    if(params.type === 'filter') {
      url += '?f=' + params.val
    } else if(params.type === 'sort') {
      url += '?s=' + params.item + '&c=' + params.cat
    }
  }
  $loader().show()
  $.when(apiRequest(url), apiRequest('/towns'), apiRequest('/countries'))
  .then(function(resP, resT, resC) {
    renderers.renderPlaces(resP[0].data, resT[0].data, resC[0].data)
  })
}

function loadPlace(url) {
  var place = null
  $loader().show()
  apiRequest(url).then(function(dataP) {
    place = dataP.data
    return apiRequest('/places/' + place.id + '/comments')
  }).done(function(dataC) {
    renderers.renderPlace(place, dataC.data)
  })
}

function loadAddPlace(place) {
  $loader().show()
  apiRequest('/places', 'POST', {place: place}).done(loadPlaceFromAdd)
}

function loadAddComment(comment) {
  var url = '/places/' + comment.placeId + '/comments'
  $loader().show()
  apiRequest(url, 'POST', {comment: comment}).done(loadPlaceFromAdd)
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

function loadAddCountry(country) {
  apiRequest('/countries', 'POST', {country: country}).done(loadCountryFromAdd)
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

function loadCountryFromAdd(dataC) {
  var id = dataC.data.country_id
  loadCountry('/countries/' + id)
}

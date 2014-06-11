'use strict';

var $ = require('jquery')
  , _ = require('lodash')
  , selectors = require('./selectors')
  , $loader = selectors.gifLoader

module.exports = {
    renderPlace: renderPlace
  , renderPlaces: renderPlaces
  , renderTowns: renderTowns
}


function renderPage(title, content) {
  var $main = $('.js-main')
    , pageTemplate = _.template($('#js-page').html())
  $main.html(pageTemplate({title: title, content: content}))
}


// PLACES

function renderPlace(dataP) {
  var place = dataP.data
    , placeItemTemplate = _.template($('#js-index-place-item').html())
  renderPage(place.name, placeItemTemplate({
      place: place
    , town: place.town
    , country: place.town.country
  }))
  $loader().hide()
}

function renderPlaces(dataP) {
  var places = dataP.data
    , placeItemListTemplate = _.template($('#js-index-place-item-list').html())
    , str = ''
  $.each(places, function(i, place) {
    str += placeItemListTemplate(place)
  })
  renderPage('Places', str)
  $loader().hide()
}


// TOWNS

function renderTowns(dataT) {
  var towns = dataT.data
    , townItemListTemplate = _.template($('#js-index-town-item-list').html())
    , str = ''
  $.each(towns, function(i, town) {
    str += townItemListTemplate(town)
  })
  renderPage('Towns', str)
  $loader().hide()
}

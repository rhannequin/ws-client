'use strict';

var $ = require('jquery')
  , _ = require('lodash')
  , selectors = require('./selectors')
  , behavors = require('./behaviors')
  , $mainContainer = selectors.mainContainer
  , $loader = selectors.gifLoader
  , $sidebar = selectors.sidebar

module.exports = {
    renderHome: renderHome
  , renderPlace: renderPlace
  , renderPlaces: renderPlaces
  , renderTowns: renderTowns
  , renderTown: renderTown
}


function renderPage(title, content) {
  var $main = $mainContainer()
    , pageTemplate = _.template($('#js-page').html())
  $main.html(pageTemplate({title: title, content: content}))
}


function renderHome() {
  var homeTemplate = _.template($('#js-home').html())
  renderPage('Homepage', homeTemplate())
  updateSidebar('home')
  hideLoader()
}


// PLACES

function renderPlace(dataP) {
  var place = dataP.data
    , placeItemTemplate = _.template($('#js-place-item').html())
  renderPage('Place: ' + place.name, placeItemTemplate({
      place: place
    , town: place.town
    , country: place.town.country
  }))
  hideLoader()
}

function renderPlaces(dataP) {
  var places = dataP.data
    , placeListTemplate = _.template($('#js-place-list').html())
  renderPage('Places', placeListTemplate({places: places}))
  updateSidebar('places')
  hideLoader()
  behavors.placesList()
}


// TOWNS

function renderTowns(dataT) {
  var towns = dataT.data
    , townItemListTemplate = _.template($('#js-town-item-list').html())
    , str = ''
  $.each(towns, function(i, town) {
    str += townItemListTemplate(town)
  })
  renderPage('Towns', str)
  updateSidebar('towns')
  hideLoader()
}

function renderTown(dataT) {
  var town = dataT.data
    , townItemTemplate = _.template($('#js-town-item').html())
  renderPage('Town: ' + town.name, townItemTemplate({
      town: town
    , country: town.country
  }))
  hideLoader()
}


// Internal

function updateSidebar(toActive) {
  var $s = $sidebar()
    , active = 'active'
  $s.find('li.' + active).removeClass(active)
  $s.find('li.css-' + toActive).addClass(active)
}

function hideLoader() {
  $loader().hide()
}

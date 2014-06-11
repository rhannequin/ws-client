;(function(){
  'use strict';

  var $                     = require('jquery')
    , _                     = require('lodash')
    , apiRequest            = require('./api')
    , pageTemplate          = _.template($('#js-page').html())
    , placeItemListTemplate = _.template($('#js-index-place-item-list').html())
    , placeItemTemplate     = _.template($('#js-index-place-item').html())
    , $loader               = $('.navbar-brand').find('.js-loader')
    , $main                 = $('.js-main')

  // Events
  $('body').on('click', '.js-place-item', showPlaceEvt)

  loadPlaces()

  function displayPlaces(dataP) {
    var places = dataP.data
      , str = ''
    $.each(places, function(i, place) {
      str += placeItemListTemplate(place)
    })
    renderPage('Homepage', str)
    $loader.hide()
  }

  function loadPlaces() {
    $loader.show()
    apiRequest('/places').done(displayPlaces)
  }

  function loadPlace(url) {
    $loader.show()
    apiRequest(url).done(displayPlace)
  }

  function showPlaceEvt(e) {
    e.preventDefault()
    var href = $(e.currentTarget).attr('href')
    loadPlace(href)
  }

  function displayPlace(dataP) {
    var place = dataP.data
    renderPage(place.name, placeItemTemplate(place))
    $loader.hide()
  }

  function renderPage(title, content) {
    $main.html(pageTemplate({title: title, content: content}))
  }

})()

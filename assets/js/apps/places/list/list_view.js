PlaceManager.module("PlacesApp.List", function(List, PlaceManager, Backbone, Marionette, $, _){
  List.Layout = Marionette.Layout.extend({
    template: "#place-list-layout",

    regions: {
      panelRegion: "#panel-region",
      placesRegion: "#places-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template: "#place-list-panel",

    triggers: {
      "click button.js-new": "place:new"
    },

    events: {
      "submit #filter-form": "filterPlaces"
    },

    ui: {
      criterion: "input.js-filter-criterion"
    },

    filterPlaces: function(e){
      e.preventDefault();
      var criterion = this.$(".js-filter-criterion").val();
      this.trigger("places:filter", criterion);
    },

    onSetFilterCriterion: function(criterion){
      this.ui.criterion.val(criterion);
    }
  });

  List.Place = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#place-list-item",

    triggers: {
      "click td a.js-show": "place:show",
      "click td a.js-edit": "place:edit",
      "click button.js-delete": "place:delete"
    },

    events: {
      "click": "highlightName"
    },

    flash: function(cssClass){
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function(){
        setTimeout(function(){
          $view.toggleClass(cssClass)
        }, 500);
      });
    },

    highlightName: function(e){
      this.$el.toggleClass("warning");
    },

    remove: function(){
      var self = this;
      this.$el.fadeOut(function(){
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  var NoPlacesView = Marionette.ItemView.extend({
    template: "#place-list-none",
    tagName: "tr",
    className: "alert"
  });

  List.Places = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#place-list",
    emptyView: NoPlacesView,
    itemView: List.Place,
    itemViewContainer: "tbody",

    initialize: function(){
      this.listenTo(this.collection, "reset", function(){
        this.appendHtml = function(collectionView, itemView, index){
          collectionView.$el.append(itemView.el);
        }
      });
    },

    onCompositeCollectionRendered: function(){
      this.appendHtml = function(collectionView, itemView, index){
        collectionView.$el.prepend(itemView.el);
      }
    }
  });
});

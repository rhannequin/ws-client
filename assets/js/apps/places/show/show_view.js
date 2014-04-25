PlaceManager.module("PlacesApp.Show", function(Show, PlaceManager, Backbone, Marionette, $, _){
  Show.MissingPlace = Marionette.ItemView.extend({
    template: "#missing-place-view"
  });

  Show.Place = Marionette.ItemView.extend({
    template: "#place-view",

    events: {
      "click a.js-edit": "editClicked"
    },

    editClicked: function(e){
      e.preventDefault();
      this.trigger("place:edit", this.model);
    }
  });
});

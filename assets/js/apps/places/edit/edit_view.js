PlaceManager.module("PlacesApp.Edit", function(Edit, PlaceManager, Backbone, Marionette, $, _){
  Edit.Place = PlaceManager.PlacesApp.Common.Views.Form.extend({
    initialize: function(){
      this.title = "Edit " + this.model.get("name");
    },

    onRender: function(){
      if(this.options.generateTitle){
        var $title = $('<h1>', { text: this.title });
        this.$el.prepend($title);
      }

      this.$(".js-submit").text("Update place");
    }
  });
});

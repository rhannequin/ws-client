PlaceManager.module("PlacesApp", function(PlacesApp, PlaceManager, Backbone, Marionette, $, _){
  PlacesApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "places(/filter/criterion::criterion)": "listPlaces",
      "places/:id": "showPlace",
      "places/:id/edit": "editPlace"
    }
  });

  var API = {
    listPlaces: function(criterion){
      PlacesApp.List.Controller.listPlaces(criterion);
      PlaceManager.execute("set:active:header", "places");
    },

    showPlace: function(id){
      PlacesApp.Show.Controller.showPlace(id);
      PlaceManager.execute("set:active:header", "places");
    },

    editPlace: function(id){
      PlacesApp.Edit.Controller.editPlace(id);
      PlaceManager.execute("set:active:header", "places");
    }
  };

  PlaceManager.on("places:list", function(){
    PlaceManager.navigate("places");
    API.listPlaces();
  });

  PlaceManager.on("places:filter", function(criterion){
    if(criterion){
      PlaceManager.navigate("places/filter/criterion:" + criterion);
    }
    else{
      PlaceManager.navigate("places");
    }
  });

  PlaceManager.on("place:show", function(id){
    PlaceManager.navigate("places/" + id);
    API.showPlace(id);
  });

  PlaceManager.on("place:edit", function(id){
    PlaceManager.navigate("places/" + id + "/edit");
    API.editPlace(id);
  });

  PlaceManager.addInitializer(function(){
    new PlacesApp.Router({
      controller: API
    });
  });
});

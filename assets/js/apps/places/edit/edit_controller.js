PlaceManager.module("PlacesApp.Edit", function(Edit, PlaceManager, Backbone, Marionette, $, _){
  Edit.Controller = {
    editPlace: function(id){
      var loadingView = new PlaceManager.Common.Views.Loading({
        title: "Artificial Loading Delay",
        message: "Data loading is delayed to demonstrate using a loading view."
      });
      PlaceManager.mainRegion.show(loadingView);

      var fetchingPlace = PlaceManager.request("place:entity", id);
      $.when(fetchingPlace).done(function(place){
        var view;
        if(place !== undefined){
          view = new Edit.Place({
            model: place,
            generateTitle: true
          });

          view.on("form:submit", function(data){
            if(place.save(data)){
              PlaceManager.trigger("place:show", place.get("id"));
            }
            else{
              view.triggerMethod("form:data:invalid", place.validationError);
            }
          });
        }
        else{
          view = new PlaceManager.PlacesApp.Show.MissingPlace();
        }

        PlaceManager.mainRegion.show(view);
      });
    }
  };
});

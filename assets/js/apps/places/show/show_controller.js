PlaceManager.module("PlacesApp.Show", function(Show, PlaceManager, Backbone, Marionette, $, _){
  Show.Controller = {
    showPlace: function(id){
      var loadingView = new PlaceManager.Common.Views.Loading({
        title: "Artificial Loading Delay",
        message: "Data loading is delayed to demonstrate using a loading view."
      });
      PlaceManager.mainRegion.show(loadingView);

      var fetchingPlace = PlaceManager.request("place:entity", id);
      $.when(fetchingPlace).done(function(place){
        var placeView;
        if(place !== undefined){
          placeView = new Show.Place({
            model: place
          });

          placeView.on("place:edit", function(place){
            PlaceManager.trigger("place:edit", place.get("id"));
          });
        }
        else{
          placeView = new Show.MissingPlace();
        }

        PlaceManager.mainRegion.show(placeView);
      });
    }
  }
});

PlaceManager.module("PlacesApp.List", function(List, PlaceManager, Backbone, Marionette, $, _){
  List.Controller = {
    listPlaces: function(criterion){
      var loadingView = new PlaceManager.Common.Views.Loading();
      PlaceManager.mainRegion.show(loadingView);

      var fetchingPlaces = PlaceManager.request("place:entities");

      var placesListLayout = new List.Layout();
      var placesListPanel = new List.Panel();

      $.when(fetchingPlaces).done(function(places){
        var filteredPlaces = PlaceManager.Entities.FilteredCollection({
          collection: places,
          filterFunction: function(filterCriterion){
            var criterion = filterCriterion.toLowerCase();
            return function(place){
              if(place.get("fname").toLowerCase().indexOf(criterion) !== -1){
                  return place;
              }
            };
          }
        });

        if(criterion){
          filteredPlaces.filter(criterion);
          placesListPanel.once("show", function(){
            placesListPanel.triggerMethod("set:filter:criterion", criterion);
          });
        }

        var placesListView = new List.Places({
          collection: filteredPlaces
        });

        placesListPanel.on("places:filter", function(filterCriterion){
          filteredPlaces.filter(filterCriterion);
          PlaceManager.trigger("places:filter", filterCriterion);
        });

        placesListLayout.on("show", function(){
          placesListLayout.panelRegion.show(placesListPanel);
          placesListLayout.placesRegion.show(placesListView);
        });

        placesListPanel.on("place:new", function(){
          var newPlace = new PlaceManager.Entities.Place();

          var view = new PlaceManager.PlacesApp.New.Place({
            model: newPlace
          });

          view.on("form:submit", function(data){
            if(places.length > 0){
              var highestId = places.max(function(c){ return c.id; }).get("id");
              data.id = highestId + 1;
            }
            else{
              data.id = 1;
            }
            if(newPlace.save(data)){
              places.add(newPlace);
              view.trigger("dialog:close");
              var newPlaceView = placesListView.children.findByModel(newPlace);
              // check whether the new place view is displayed (it could be
              // invisible due to the current filter criterion)
              if(newPlaceView){
                newPlaceView.flash("success");
              }
            }
            else{
              view.triggerMethod("form:data:invalid", newPlace.validationError);
            }
          });

          PlaceManager.dialogRegion.show(view);
        });

        placesListView.on("itemview:place:show", function(childView, args){
          PlaceManager.trigger("place:show", args.model.get("id"));
        });

        placesListView.on("itemview:place:edit", function(childView, args){
          var model = args.model;
          var view = new PlaceManager.PlacesApp.Edit.Place({
            model: model
          });

          view.on("form:submit", function(data){
            if(model.save(data)){
              childView.render();
              view.trigger("dialog:close");
              childView.flash("success");
            }
            else{
              view.triggerMethod("form:data:invalid", model.validationError);
            }
          });

          PlaceManager.dialogRegion.show(view);
        });

        placesListView.on("itemview:place:delete", function(childView, args){
          args.model.destroy();
        });

        PlaceManager.mainRegion.show(placesListLayout);
      });
    }
  }
});

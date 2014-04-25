PlaceManager.module("Entities", function(Entities, PlaceManager, Backbone, Marionette, $, _){
  Entities.Place = Backbone.Model.extend({
    urlRoot: "places",

    defaults: {
      name: ""
    },

    validate: function(attrs, options) {
      var errors = {}
      if (! attrs.name) {
        errors.name = "can't be blank";
      }
      if( ! _.isEmpty(errors)){
        return errors;
      }
    }
  });

  Entities.configureStorage(Entities.Place);

  Entities.PlaceCollection = Backbone.Collection.extend({
    url: "places",
    model: Entities.Place
  });

  Entities.configureStorage(Entities.PlaceCollection);

  var initializePlaces = function(){
    places = new Entities.PlaceCollection([
      { id: 1, name: "Paris" },
      { id: 2, name: "Singapore" },
      { id: 3, name: "Glasgow" }
    ]);
    places.forEach(function(place){
      place.save();
    });
    return places.models;
  };

  var API = {
    getPlaceEntities: function(){
      var places = new Entities.PlaceCollection();
      var defer = $.Deferred();
      places.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(places){
        if(places.length === 0){
          // if we don't have any places yet, create some for convenience
          var models = initializePlaces();
          places.reset(models);
        }
      });
      return promise;
    },

    getPlaceEntity: function(placeId){
      var place = new Entities.Place({id: placeId});
      var defer = $.Deferred();
      setTimeout(function(){
        place.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      }, 2000);
      return defer.promise();
    }
  };

  PlaceManager.reqres.setHandler("place:entities", function(){
    return API.getPlaceEntities();
  });

  PlaceManager.reqres.setHandler("place:entity", function(id){
    return API.getPlaceEntity(id);
  });
});

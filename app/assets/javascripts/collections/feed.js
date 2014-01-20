// probably needs to be converted to a collection
EggsBook.Collections.Feed = Backbone.Collection.extend({
  url: '/feed',

  model: EggsBook.Models.Post,

  comparator: function(model) {
    console.log(model.get('timestamp'));
    return model.get('timestamp') * -1;
  }

});
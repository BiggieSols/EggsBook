// probably needs to be converted to a collection
EggsBook.Collections.Feed = Backbone.Collection.extend({
  url: '/feed',

  model: EggsBook.Models.Post,
});
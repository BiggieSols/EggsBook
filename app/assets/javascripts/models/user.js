EggsBook.Models.User = Backbone.Model.extend({
  // confirm that this will happen automatically, but seems likely
  urlRoot: '/users',

  initialize: function() {
    this.listenTo(EggsBook.foods, "sync", this.render);
  },

  // parse: function(response) {
  //   console.log(response);
  //   return response;
  // },

  parse: function(response) {
    var posts = new EggsBook.Collections.Posts(response.posts, {parse: true});
    response.posts = posts;
    return response;
  },

});
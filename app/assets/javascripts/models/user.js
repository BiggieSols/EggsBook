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
    // need to explicitly call parse since the data is not coming from the server
      // method 1
        // var parsed_comments = new EggsBook.Collections.Comments().parse(response.comments);
        // response.comments = new EggsBook.Collections.Comments(parsed_comments);

    // method 2
    var posts = new EggsBook.Collections.Posts();
    var parsed_posts = posts.parse(response.posts);
    posts.set(parsed_posts);
    response.posts = posts;
    return response;
  },

});
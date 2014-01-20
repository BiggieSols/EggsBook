EggsBook.Models.Comment = Backbone.Model.extend({
  // initialize: function(options) {
  //   Backbone.Model.prototype.initialize.apply(this, arguments);
  //   if(options && options.post_id) {
  //     this.post_id = options.post_id;
  //   }
  // },

  urlRoot: function() {
    return '/posts/' + this.get('post_id') + '/comments';
  },

  // collection: EggsBook.Collections.Comments,

  parse: function(response) {
    var liking_users = new EggsBook.Collections.Users(response.liking_users, {parse: true});
    response.liking_users = liking_users;
    response.user = new EggsBook.Models.User(response.user);
    return response;
  }
});
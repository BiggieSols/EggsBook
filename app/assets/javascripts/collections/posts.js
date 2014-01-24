EggsBook.Collections.Posts = Backbone.Collection.extend({
  // initialize: function(options) {
    // this.user_id = options.user_id
    // this.photo_only = options.photos_only
  // },
  model: EggsBook.Models.Post,

  comparator: function(model) {
    return -model.get('timestamp');
  },

  url: '/posts',

  withPhotos: function() {
    var photoPosts = [];
    this.models.forEach(function(post) {
      // see if there are images available
      if(post.get('image_urls').small) {
        console.log("success");
        photoPosts.push(post);
      }
    });
    
    return photoPosts;
  }
});
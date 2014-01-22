EggsBook.Views.FeedView = Backbone.View.extend({
  initialize: function() {
    this.collection.fetch();
    // this.listenTo(EggsBook.feed, "sync", this.render);
  },

  events: {
    'click #new-post':'addPost',
    'change input[type=file]': 'encodeFile'
  },

  template: JST['feed/show'],

  render: function() {
    console.log("rendering view");
    this.renderTop().renderPosts();
    this.initializeDropZone();
    return this;

  },

  renderTop: function() {
    console.log("rendering top of feed");
    var renderedContent = this.template({
      user: this.model,
      currentUser: EggsBook.currentUser,
      feed: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  initializeDropZone: function() {
    var that = this;
    Dropzone.options.dropZone = {
      init: function() {
        this.on("addedfile", function(file) { 
          console.log(file);
          reader.readAsDataURL(file);
        });
      }
    };

    this.dropzone = this.$el.find('#drop-zone');
    console.log("got here");
    this.dropzone.dropzone({
      "url": "/", 
      "autoProcessQueue": false
    });

    var reader = new FileReader();
    reader.onload = function(e) {
      console.log(e.target.result);
      that.photo = e.target.result;
    };

    reader.onerror = function(stuff) {
      console.log("error", stuff);
      console.log (stuff.getMessage());
    };
  },

  renderPosts: function() {
    var postsView = new EggsBook.Views.PostsView({collection: this.collection});
    var $elToFill = this.$el.find('.posts-container');
    $elToFill.html(postsView.render().$el);
    return this;
  },

  encodeFile: function (event) {
    var that = this;
    var file = event.currentTarget.files[0];
    
    // console.log(file);
    

    console.log("got here");
  },

  addPost: function(event) {
    console.log("got here");
    event.preventDefault();
    var that = this;

    var formData = $(event.currentTarget.form).serializeJSON();
    formData.post.image = this.photo;

    console.log(formData);

    var post = new EggsBook.Models.Post(formData);

    console.log(post);

    post.save({}, {
      success: function(resp) {
        console.log(post);
        EggsBook.posts.add(post);
        that.collection.add(post);
        that.photo = undefined;
      },
    });
  }
});
EggsBook.Views.FeedView = Backbone.View.extend({
  initialize: function() {
    this.collection.fetch();
  },

  events: {
    'click #new-post':'addPost',
    'click #new-post-details':'showDropZone',
  },

  template: JST['feed/show'],

  render: function() {
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

  showDropZone: function() {
    this.$('#drop-zone').slideDown("medium");
  },

  hideDropZone: function() {
    this.$('#drop-zone').slideUp("medium");
  },

  initializeDropZone: function() {
    var that = this;
    Dropzone.options.dropZone = {
      init: function() {
        this.on("addedfile", function(file) { 
          that.encodeFile(file);
          that.removeDropZoneText();
          // reader.readAsDataURL(file);
        });
      }
    };

    this.dropzone = this.$el.find('#drop-zone');
    this.dropzone.dropzone({
      "url": "/", 
      "autoProcessQueue": false,
      "uploadMultiple": false,
      "previewTemplate": "<div class='dz-preview dz-file-preview'><div class='dz-details'><img data-dz-thumbnail /></div><div class='dz-progress'><span class='dz-upload' data-dz-uploadprogress></span></div>"
    });
  },

  removeDropZoneText: function() {
    this.$(".drop-zone-text").css("display", "none");
  },

  renderPosts: function() {
    var postsView = new EggsBook.Views.PostsView({collection: this.collection});
    var $elToFill = this.$el.find('.posts-container');
    $elToFill.html(postsView.render().$el);
    return this;
  },

  encodeFile: function (file) {
    var that = this;

    var reader = new FileReader();
    reader.onload = function(e) {
      console.log(e.target.result);
      that.photo = e.target.result;
    };

    reader.onerror = function(stuff) {
      console.log("error", stuff);
      console.log (stuff.getMessage());
    };

    reader.readAsDataURL(file);
  },

  resetNewPostForm: function() {
    this.photo = undefined;
    this.$('#post-submission-processing').toggleClass("invisible");
    this.$('.dz-preview').remove();
    this.$('#new-post-details').val("");
    this.$(".drop-zone-text").css("display", "block");
  },

  addPost: function(event) {
    event.preventDefault();
    var that = this;

    this.$('#post-submission-processing').toggleClass("invisible");
    this.hideDropZone();

    var formData = $(event.currentTarget.form).serializeJSON();
    formData.post.image = this.photo;

    var post = new EggsBook.Models.Post(formData);

    post.save({}, {
      success: function(resp) {
        EggsBook.posts.add(post);
        EggsBook.feed.add(post);
        that.resetNewPostForm();
      },
    });
  }
});
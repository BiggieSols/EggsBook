EggsBook.Views.PostView = Backbone.View.extend({
  events: {
    'submit #new_comment':'add_comment',
    'click .like':'like',
    'click .unLike':'unLike'
  },

  initialize: function() {
    // this.listenTo(this.model.get('comments'), "all", this.render);
    this.listenTo(this.model.get('liking_users'), "add", this.render);
  },

  template: JST['posts/show'],

  render: function() {
    console.log("rendering!");
    // console.log("current user's liked post ids: " + EggsBook.currentUser.get('liked_post_ids'));
    console.log("num liking users: " + this.model.get('liking_users').models.length);
    var renderedContent = this.template({post: this.model, currentUser: EggsBook.currentUser});
    this.$el.html(renderedContent);
    return this;
  },

  add_comment: function(event) {
    var that = this;

    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();
    formData.comment.post_id = this.model.id;
    console.log(formData);

    var comment = new EggsBook.Models.Comment(formData.comment);

    console.log(comment);

    comment.save({}, {
      success: function() {
        that.model.get('comments').add(comment);
      },
    });
  },

  // clean this up later. toggle both classes
  like: function(event) {
    var button = $(event.currentTarget);
    // this.changeButton(button);
    var dataType = button.attr("data-type");
    // console.log(button.attr("data-type"))
    if(dataType === "post") {
      var objToLike = new EggsBook.Models.PostLike({ "post_id": this.model.id });
      var target = this.model;
    } else {
      // add logic here
      // objToLike = EggsBook.Models.CommentLike({"comment_id"})
    }

    var attrName = 'liked_'+ dataType + '_ids';

    var likedObjIds = EggsBook.currentUser.get(attrName);
    likedObjIds = likedObjIds.concat(parseInt(button.attr('data-id')));
    console.log("liked obj ids are " + likedObjIds);

    var attributes = {};
    attributes[attrName] = likedObjIds;
    EggsBook.currentUser.set(attributes);
    
    target.get('liking_users').add(EggsBook.currentUser);
    objToLike.save();
  },

  unLike: function(event) {
    button = $(event.currentTarget);
    this.changeButton(button);
  },

  changeButton: function(button) {
    console.log("changing class");
    var currentClass = button.attr('class');
    var classToAdd = (currentClass == "like" ? "unLike" : "like");
    var buttonText = currentClass == "like" ? "Un-Like" : "Like";
    button.text(buttonText).removeClass(currentClass).addClass(classToAdd);
  }
});






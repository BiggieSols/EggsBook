EggsBook.Views.PostView = EggsBook.Views.LikableObject.extend({
  events: function(){
      return _.extend(EggsBook.Views.LikableObject.prototype.events, {
      'submit .new-comment':'add_comment',
    });
  },

  initialize: function() {
    this.listenTo(this.model.get('liking_users'), "add remove", this.render);
    this.listenTo(this.model.get('comments'), "add remove change", this.render);
    this.listenTo(EggsBook.currentUser, "sync change add", this.render);
  },

  template: JST['posts/show'],
  postSkeletonTemplate: JST['posts/post_skeleton'],
  commentSkeletonTemplate: JST['posts/comment_skeleton'],
  likeButtonTemplate: JST['posts/like_button'],
  likingUsersTemplate: JST['posts/liking_users'],
  detailsTemplate: JST['posts/details'],

  render: function() {
    return this.render_post_piecewise();
  },

  render_post_piecewise: function() {
    return this._renderPostSkeleton()
               ._renderLikeButton();
               // ._renderCommentSkeleton()
               // ._renderLikingUsers()
               // ._renderDetails();
  },

  _renderPostSkeleton: function() {
    var renderedContent = this.postSkeletonTemplate({post: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  _renderLikeButton: function() {
    var renderedContent = this.likeButtonTemplate({
      objToRender: this.model, 
      dataType: "post",
      currentUser: EggsBook.currentUser
    });
    var $elToFill = this.$el.find('.like-button');
    $elToFill.html(renderedContent);
    EggsBook.tempView = this;
    return this;
  },

  _renderLikingUsers: function(){
    var renderedContent = this.likeButtonTemplate({objToRender: this.model});
    var $elToFill = this.$el.find('liking-users');
    $elToFill.html(renderedContent);
    return this;
  },

  _renderDetails: function() {
    var renderedContent = this.likeButtonTemplate({objToRender: this.model});
    var $elToFill = this.$el.find('details');
    $elToFill.html(renderedContent);
    return this;
  },

  // _renderCommentSkeleton: function() {
  //   return this._renderAbstracted('comment', this.commentSkeletonTemplate);
  // },

  // _renderLikeButtons: function() {
  //   return this._renderAbstracted('like-button', this.likeButtonTemplate);
  // },

  // _renderLikingUsers: function() {
  //   return this._renderAbstracted('liking-users', this.likingUsersTemplate);
  // },

  // _renderDetails: function() {
  //   return this._renderAbstracted('details', this.detailsTemplate);
  // },

  // _renderAbstracted: function(className, template) {
  //   var that = this;
  //   var jqObj, objId, objType, objToAdd, objToRender;

  //   var jqArrObj = this.$el.find('.' + className);
  //   $.each(jqArrObj, function(i) {
  //     jqObj = $(jqArrObj[i]);
  //     objId = jqObj.data('id');

  //     // this is the string name, e.g. "comment"
  //     objType = jqObj.data('type');

  //     // _getObjToAdd returns the actual backbone object, e.g. BackBone.Models.Comment
  //     // you can use these methods elsewhere, and just redefine _getObjToAdd
  //     objToAdd = that._getObjToAdd(jqObj);

  //     objToRender = template({
  //       objToRender:objToAdd,
  //       currentUser: EggsBook.currentUser,
  //       dataType: objType
  //     });

  //     jqObj.html(objToRender);
  //   });

  //   return this;
  // },

  // _getObjToAdd: function(jqObj) {
  //   var objType = jqObj.data('type');
  //   var objId = jqObj.data('id');

  //   if(objType == "post") {
  //     return this.model;
  //   } else {
  //     return this.model.get('comments').get(objId);
  //   }
  // },

  add_comment: function(event) {
    var that = this;

    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();
    formData.comment.post_id = this.model.id;

    var comment = new EggsBook.Models.Comment(formData.comment);

    console.log(comment);

    comment.save({}, {
      success: function() {
        that.model.get('comments').add(comment);
      },
    });
  },
});
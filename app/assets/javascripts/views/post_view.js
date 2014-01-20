EggsBook.Views.PostView = Backbone.View.extend({
  events: {
    'submit #new_comment':'add_comment',
    'click .like':'toggleLike',
    'click .unLike':'toggleLike'
  },

  initialize: function() {
    // this.listenTo(this.model.get('comments'), "all", this.render);
    this.listenTo(this.model.get('liking_users'), "add remove", this.render);
    this.listenTo(this.model.get('comments'), "add remove change", this.render);
    this.listenTo(EggsBook.currentUser, "sync", this.render);
  },

  template: JST['posts/show'],
  post_skeleton_template: JST['posts/post_skeleton'],
  comment_skeleton_template: JST['posts/comment_skeleton'],
  like_button_template: JST['posts/like_button'],

  render: function() {
    return this.render_post_piecewise();
    // console.log("rendering!");
    // var renderedContent = this.template({post: this.model, currentUser: EggsBook.currentUser});
    // this.$el.html(renderedContent);
    // return this;
  },

  render_post_piecewise: function() {
    console.log("chained rendering invoked!");
    return this._render_post_skeleton()
               ._render_comment_skeletons()
               ._render_like_buttons();
  },

  _render_post_skeleton: function() {
    var renderedContent = this.post_skeleton_template({post: this.model, currentUser: EggsBook.currentUser});
    this.$el.html(renderedContent);
    return this;
  },

  _render_comment_skeletons: function() {
    var that = this;
    var comments = this.$el.find('.comment');
    $.each(comments, function(i) {
      commentEl = $(comments[i]);
      commentId = commentEl.data('id');
      commentToAdd = that.model.get('comments').get(commentId);
      renderedComment = that.comment_skeleton_template({comment:commentToAdd});
      commentEl.html(renderedComment);
    });
    return this;
  },

  _render_like_buttons: function() {
    return this._renderAbstracted('like-button', this.like_button_template);
        // var that = this;
    // var likeButtons = this.$el.find('.like-button');

    // var jqObj, objId, objType, objToAdd, objToRender;

    // $.each(likeButtons, function(i) {
    //   jqObj = $(likeButtons[i]);
    //   objId = jqObj.data('id');

    //   objType = jqObj.data('type');
    //   if(objType == "post") {
    //     objToAdd = that.model;
    //   } else {
    //     objToAdd = that.model.get('comments').get(objId);
    //   }

    //   objToRender = that.like_button_template({
    //     objToRender:objToAdd,
    //     currentUser: EggsBook.currentUser,
    //     dataType: objType
    //   });

    //   jqObj.html(objToRender);
    // });
    // return this;
  },

  _renderLikingUsers: function() {

  },

  _renderDetails: function() {

  },

  _renderAbstracted: function(className, template) {
    var that = this;
    var jqObj, objId, objType, objToAdd, objToRender;

    var jqArrObj = this.$el.find('.' + className);
    $.each(jqArrObj, function(i) {
      jqObj = $(jqArrObj[i]);
      objId = jqObj.data('id');

      // this is the string name, e.g. "comment"
      objType = jqObj.data('type');

      // _getObjToAdd returns the actual backbone object, e.g. BackBone.Models.Comment
      // you can use these methods elsewhere, and just redefine _getObjToAdd
      objToAdd = that._getObjToAdd(jqObj);

      objToRender = template({
        objToRender:objToAdd,
        currentUser: EggsBook.currentUser,
        dataType: objType
      });

      jqObj.html(objToRender);
    });

    return this;
  },

  _getObjToAdd: function(jqObj) {
    var objType = jqObj.data('type');
    var objId = jqObj.data('id');

    if(objType == "post") {
      return this.model;
    } else {
      return this.model.get('comments').get(objId);
    }
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

  toggleLike: function(event) {
    var _setAttributes = function() {
      var attributes = {};
      attributes[attrName] = likedObjIds;
      console.log("Attributes are ");
      console.log(attributes);
      EggsBook.currentUser.set(attributes);
    };

    var _like = function() {
      likedObjIds = likedObjIds.concat(dataId);

      _setAttributes();

      target.get('liking_users').add(EggsBook.currentUser);
      likeObj.save();
    };

    var _unLike = function() {
      // set dummy id so we can destroy the object. 
      // destroy is based on the current_user and post_id or comment_id server side, 
      // not the id of the PostLike or CommentLike object
      likeObj.id = -1;
      likedObjIds = _.without(likedObjIds, dataId);

      _setAttributes();

      target.get('liking_users').remove(EggsBook.currentUser);
      likeObj.destroy();
    };

    var button = $(event.currentTarget);
    var dataType = button.attr("data-type");
    var action = button.attr("data-action");
    var dataId = parseInt(button.attr("data-id"));
    var likeObj, target;

    if(dataType === "post") {
      likeObj = new EggsBook.Models.PostLike({ "post_id": this.model.id });
      target = this.model;
    } else {
      likeObj = new EggsBook.Models.CommentLike({"comment_id": dataId});
      target = this.model.get('comments').get(dataId);
    }

    var attrName = 'liked_'+ dataType + '_ids';
    var likedObjIds = EggsBook.currentUser.get(attrName);

    if(action == "like"){
      console.log("attempting to like");
      _like();
    } else {
      console.log("attempting to unLike");
      _unLike();
    }
    this.render();
  },
});





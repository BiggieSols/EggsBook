class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(params[:comment])
    @comment.user_id = current_user.id
    if @comment.save
      redirect_to user_feed_url(current_user)
    else
      errors = @comment.errors.full_messages
      flash[:error] = errors
      redirect_to user_feed_url(current_user)
    end
  end

  def destroy

  end
end

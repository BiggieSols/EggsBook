class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(params[:comment])
    @comment.user_id = current_user.id
    if @comment.save
      @comment.post.touch
      redirect_to feed_url
    else
      errors = @comment.errors.full_messages
      flash[:error] = errors
      redirect_to feed_url
    end
  end

  def destroy

  end
end

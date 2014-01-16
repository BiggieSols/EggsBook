class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:id])
    @comment = @post.comments.build(params[:comment])
    @comment.user_id = current_user.id
    if @comment.save
      redirect_to post_url(@post)
    else
      errors = @comment.errors.full_messages
      flash[:error] = errors
      redirect_to post_url(@post)
    end
  end

  def destroy
  end
end

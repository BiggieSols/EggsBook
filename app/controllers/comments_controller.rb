class CommentsController < ApplicationController
  def show
    @comment = Comment.find(params[:id], include: :liking_users)
  end
  
  def index
    @comments = Comment.all(include: :liking_users)
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(params[:comment])
    @comment.user_id = current_user.id
    if @comment.save
      @comment.post.touch
      render 'create'
      # redirect_to feed_url
    else
      errors = @comment.errors.full_messages
      flash[:error] = errors
      redirect_to feed_url
    end
  end

  def destroy
  end
end

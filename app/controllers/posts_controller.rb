class PostsController < ApplicationController
  def create
    @post = Post.new(params[:post])
    @post.user_id = current_user.id
    if @post.save
      redirect_to user_url(current_user)
    else
      errors = @post.errors.full_messages
      flash[:errors] = errors
      redirect_to user_url(current_user)
    end
  end

  def show
    @post = Post.includes(:comments)
                .includes(:commenting_users)
                .find(params[:id])

    @comment = @post.comments.build
  end
end
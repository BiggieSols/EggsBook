class PostsController < ApplicationController
  def index
    @posts = Post.all(include: [:posting_user, 
                      :liking_users, 
                      :comments => [:user, :liking_users] 
                    ])
  end

  def create
    @post = Post.new(params[:post])
    @post.user_id = current_user.id
    if @post.save
      # redirect_to user_url(current_user)
      render 'show'
    else
      errors = @post.errors.full_messages
      flash[:errors] = errors
      # redirect_to user_url(current_user)
      render json: @post.errors
    end
  end

  def show
    @post = Post.find(params[:id], 
                  include: [:posting_user, 
                            :liking_users, 
                            :comments => [:user, :liking_users] 
                  ])
  end
end
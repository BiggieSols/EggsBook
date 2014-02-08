class UsersController < ApplicationController
  skip_before_filter :require_login, only: [:new, :create]

  def index
    @users = User.all(include: [:comments, :friends, :posts => [
                                  :posting_user, 
                                  :liking_users, 
                                  :comments => 
                                    [
                                      :user, :liking_users
                                    ]
                                  ]
                      ])
  end

  def new
    @user = User.includes(:favorite_foods).new
  end

  def show
    id = params[:id] == "current" ? current_user.id : params[:id]

    @user = User.find(id, include: [
                            :favorite_foods, 
                            :posts => [
                              :posting_user, 
                              :liking_users, 
                              :comments => [
                                :user, :liking_users
                              ]
                            ]
                          ])
  end

  def edit
    @user = User.includes(:favorite_foods).find(params[:id])
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      log_in! @user
      redirect_to user_url(@user)
    else
      errors = @user.errors.full_messages
      flash.now[:errors] = errors
      render :new
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      redirect_to user_url(@user)
    else
      errors = @user.errors.full_messages
      flash.now[:errors] = errors
      render :edit
    end
  end

  def destroy
    log_out!
    @user = User.find(params[:id])
    @user.destroy
    redirect_to new_user_url
  end

  # not using this
  # def photos
  #   @photos = User.find(params[:id])
  #                 .posts
  #                 .where("image_file_name != ?", "nil")

  #   render json: @photos
  # end

  # not using this
  # def friends
  #   @user = User.find(params[:id])
  #   @friends = @user.friends

  #   if @user != current_user
  #     @mutual_friends = current_user.friends & @user.friends
  #   else
  #     @mutual_friends = []
  #   end

  #   render json: @friends
  # end
end
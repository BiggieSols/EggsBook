class UsersController < ApplicationController
  skip_before_filter :require_login, only: [:new, :create]

  def index
    @users = User.all
    @users.delete(current_user)
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(params[:user])

    food_ids = params[:favorite_foods]
    food_ids.each do |food|
      @user.user_foods.build(food_id: food)
    end

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
end
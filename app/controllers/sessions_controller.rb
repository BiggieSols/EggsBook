class SessionsController < ApplicationController
  skip_before_filter :require_login

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(params[:user])
    if @user
      log_in! @user
      redirect_to feed_url
    else
      flash[:errors] = ["invalid username or password"]
      # this part below is only for rails, can remove w/ backbone
      @user = User.new(params[:user])
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end
end

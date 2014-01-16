class FriendRequestsController < ApplicationController
  def create
    params[:friend_request][:user_id] = current_user.id
    @friend_request = FriendRequest.new(params[:friend_request])
    if @friend_request.save
      flash.now[:success] = "friend added successfully!"
      redirect_to users_url
    else
      errors = @friend_request.errors.full_messages
      flash.now[:errors] = errors
      redirect_to users_url
    end
  end

  def destroy
    request = FriendRequest.find_by_user_id_and_friend_id(current_user.id, params[:friend_id])
    request.destroy
    puts "\n\n\n friend request destroyed! \n\n\n"
    redirect_to users_url
  end
end
class FriendshipsController < ApplicationController
  def create
    # remove the previously existing friend request
    user_id = current_user.id
    friend_id = params[:friendship][:friend_id]

    # need to reverse order here since the other user initially requested the friendship
    request = FriendRequest.find_by_user_id_and_friend_id(friend_id, user_id)
    puts "\n\n\n"
    puts "requester: #{request.user_id}" 
    puts "requested: #{request.friend_id}"
    puts "\n\n\n"

    request.destroy
    

    # add two new friendships (bi-directional)
    friendship_1 = Friendship.new(user_id: user_id, friend_id: friend_id)
    friendship_2 = Friendship.new(user_id: friend_id, friend_id: user_id)

    # ADD THIS AFTER TESTING
    # ActiveRecord::Base.transaciton do
    # end

    if friendship_1.save  && friendship_2.save
      flash.now[:success] = "request approved!"
      redirect_to users_url
    else
      errors = friendship_1.errors.full_messages + friendship_2.errors.full_messages
      flash.now[:errors] = errors
      redirect_to users_url
    end
  end

  # def create
  #   params[:friendship][:user_id] = current_user.id
  #   @friendship = Friendship.new(params[:friendship])
  #   if @friendship.save
  #     flash.now[:success] = "friend added successfully!"
  #     redirect_to users_url
  #   else
  #     errors = @friendship.errors.full_messages
  #     flash.now[:errors] = errors
  #     redirect_to users_url
  #   end
  # end

  def destroy
    request = Friendship.find_by_user_id_and_friend_id(current_user.id, params[:friend_id])
    request.destroy
    flash.now[:success] = "un-friended!"
    redirect_to users_url
  end
end

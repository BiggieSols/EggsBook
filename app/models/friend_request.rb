class FriendRequest < ActiveRecord::Base
  attr_accessible :friend_id, :user_id

  belongs_to :requesting_user, foreign_key: :user_id, class_name: "User"
  belongs_to :requested_user, foreign_key: :friend_id, class_name: "User"
end

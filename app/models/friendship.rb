class Friendship < ActiveRecord::Base
  attr_accessible :friend_id, :user_id

  belongs_to :friend_having_user, foreign_key: :user_id, class_name: "User"
  belongs_to :friended_user, foreign_key: :friend_id, class_name: "User"
end

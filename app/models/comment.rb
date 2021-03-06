class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user

  has_many :likes, as: :likable_object
  has_many :liking_users, through: :likes, source: :user

  attr_accessible :details

  def liked_by_user?(user)
    return user.liked_comments.include?(self)
  end
end
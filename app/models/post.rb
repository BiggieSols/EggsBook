class Post < ActiveRecord::Base
  attr_accessible :details, :image

  has_attached_file :image, styles: {
    large: "600x600",
    medium: "300x300",
    small: "40x40"
  }

  has_many :likes, as: :likable_object
  has_many :liking_users, through: :likes, source: :user

  has_many :comments
  has_many :commenting_users, through: :comments, source: :user

  belongs_to :posting_user, foreign_key: :user_id, class_name: "User"

  validates :details, presence: true

  def liked_by_user?(user)
    return user.liked_posts.include?(self)
  end
end

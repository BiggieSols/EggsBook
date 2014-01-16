class Post < ActiveRecord::Base
  attr_accessible :details, :image

  has_attached_file :image, styles: {
    big: "600x600",
    small: "300x300",
  }

  has_many :comments
  has_many :commenting_users, through: :comments, source: :user

  belongs_to :posting_user, foreign_key: :user_id, class_name: "User"

  validates :details, presence: true
end

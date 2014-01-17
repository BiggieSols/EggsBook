class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :user

  has_many :likes, as: :likable_object

  attr_accessible :details
end
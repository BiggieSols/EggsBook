class Post < ActiveRecord::Base
  attr_accessible :details

  belongs_to :user
  has_many :comments
  
  validates :details, presence: true
end

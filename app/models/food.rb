class Food < ActiveRecord::Base
  attr_accessible :name

  has_many :user_foods
  has_many :users, through: :user_foods
end

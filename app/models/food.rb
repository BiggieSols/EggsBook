class Food < ActiveRecord::Base
  has_many :user_foods
  has_many :users, through: :user_foods
  attr_accessible :name
end

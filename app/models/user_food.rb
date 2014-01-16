class UserFood < ActiveRecord::Base
  attr_accessible :food_id
  
  belongs_to :user
  belongs_to :food
end

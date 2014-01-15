class UserFood < ActiveRecord::Base
  belongs_to :user
  belongs_to :food
  # attr_accessible :title, :body
end

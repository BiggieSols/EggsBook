class Food < ActiveRecord::Base
  attr_accessible :name, :image

  has_attached_file :image, styles: {
    medium: "150x150",
    icon: "40x40"
  }

  has_many :user_foods
  has_many :users, through: :user_foods
end

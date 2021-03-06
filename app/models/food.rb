class Food < ActiveRecord::Base
  attr_accessible :name, :image

  has_attached_file :image, styles: {
    large: "600x600",
    medium: "300x300",
    small: "150x150",
    icon: "40x40"
  }

  has_many :user_foods
  has_many :users, through: :user_foods

  def photo_urls
    if self.image.url == "/images/original/missing.png"
      return {} 
    else
      sizes = [:icon, :medium]
      photo_urls = {}
      sizes.each {|size| photo_urls[size] = self.image.url(size)}
      return photo_urls
    end
  end
end

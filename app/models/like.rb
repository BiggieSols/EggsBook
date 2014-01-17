class Like < ActiveRecord::Base
  belongs_to :user

  belongs_to :likable_object, polymorphic: true
  # attr_accessible :title, :body
end

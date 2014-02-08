class Like < ActiveRecord::Base
  belongs_to :user

  belongs_to :likable_object, polymorphic: true
end

class AddImageToFoods < ActiveRecord::Migration
  def self.up
    change_table :foods do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :foods, :image
  end
end
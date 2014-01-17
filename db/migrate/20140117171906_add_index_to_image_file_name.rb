class AddIndexToImageFileName < ActiveRecord::Migration
  def change
    add_index :posts, :image_file_name
  end
end
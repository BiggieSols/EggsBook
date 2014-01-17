class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.references :user, null: false
      t.references :likable_object, polymorphic: true, null: false

      t.timestamps
    end
    add_index :likes, :user_id
    add_index :likes, :likable_object_id
  end
end

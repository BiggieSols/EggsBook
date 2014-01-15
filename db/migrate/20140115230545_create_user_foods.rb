class CreateUserFoods < ActiveRecord::Migration
  def change
    create_table :user_foods do |t|
      t.references :user, null: false
      t.references :food, null: false

      t.timestamps
    end
    add_index :user_foods, :user_id
    add_index :user_foods, :food_id
    add_index :user_foods, [:user_id, :food_id], unique: true
  end
end

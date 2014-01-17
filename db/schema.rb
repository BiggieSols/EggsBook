# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140117171906) do

  create_table "comments", :force => true do |t|
    t.integer  "post_id"
    t.text     "details"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
  end

  add_index "comments", ["post_id"], :name => "index_comments_on_post_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "foods", :force => true do |t|
    t.string   "name",               :null => false
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "friend_requests", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "friend_id",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "friend_requests", ["friend_id", "user_id"], :name => "index_friend_requests_on_friend_id_and_user_id", :unique => true
  add_index "friend_requests", ["friend_id"], :name => "index_friend_requests_on_friend_id"
  add_index "friend_requests", ["user_id"], :name => "index_friend_requests_on_user_id"

  create_table "friendships", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "friend_id",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "friendships", ["friend_id"], :name => "index_friendships_on_friend_id"
  add_index "friendships", ["user_id", "friend_id"], :name => "index_friendships_on_user_id_and_friend_id", :unique => true
  add_index "friendships", ["user_id"], :name => "index_friendships_on_user_id"

  create_table "likes", :force => true do |t|
    t.integer  "user_id",             :null => false
    t.integer  "likable_object_id",   :null => false
    t.string   "likable_object_type", :null => false
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  add_index "likes", ["likable_object_id"], :name => "index_likes_on_likable_object_id"
  add_index "likes", ["user_id"], :name => "index_likes_on_user_id"

  create_table "posts", :force => true do |t|
    t.integer  "user_id"
    t.text     "details"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "posts", ["image_file_name"], :name => "index_posts_on_image_file_name"
  add_index "posts", ["user_id"], :name => "index_posts_on_user_id"

  create_table "user_foods", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "food_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_foods", ["food_id"], :name => "index_user_foods_on_food_id"
  add_index "user_foods", ["user_id", "food_id"], :name => "index_user_foods_on_user_id_and_food_id", :unique => true
  add_index "user_foods", ["user_id"], :name => "index_user_foods_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email",                        :null => false
    t.string   "password_digest",              :null => false
    t.string   "session_token",                :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "name"
    t.text     "about_me"
    t.string   "profile_picture_file_name"
    t.string   "profile_picture_content_type"
    t.integer  "profile_picture_file_size"
    t.datetime "profile_picture_updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email"
  add_index "users", ["password_digest"], :name => "index_users_on_password_digest"
  add_index "users", ["session_token"], :name => "index_users_on_session_token"

end

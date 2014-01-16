# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(name: "sol", email: "sol@gmail.com", password: "asdf", about_me: "here is some info about sol", profile_picture: File.open('app/assets/images/seed_photos/sol.jpg'))
User.create(name: "brian", email: "brian@gmail.com", password: "asdf", about_me: "here is some info about brian", profile_picture: File.open('app/assets/images/seed_photos/brian.jpg'))
User.create(name: "danilo", email: "danilo@gmail.com", password: "asdf", about_me: "here is some info about danilo", profile_picture: File.open('app/assets/images/seed_photos/danilo.jpg'))
User.create(name: "steve", email: "steve@gmail.com", password: "asdf", about_me: "here is some info about steve", profile_picture: File.open('app/assets/images/seed_photos/steve.jpg'))
User.create(name: "jenny", email: "jenny@gmail.com", password: "asdf", about_me: "here is some info about jenny", profile_picture: File.open('app/assets/images/seed_photos/jenny.jpg'))
User.create(name: "brittani", email: "brittani@gmail.com", password: "asdf", about_me: "here is some info about brittani", profile_picture: File.open('app/assets/images/seed_photos/brittani.jpg'))

Food.create(name: "breakfast burrito")
Food.create(name: "scrambled eggs")
Food.create(name: "omelette")
Food.create(name: "egg sandwich")
Food.create(name: "eggs benedict")
Food.create(name: "eggs over easy")
Food.create(name: "hash browns")
Food.create(name: "bacon")
Food.create(name: "french toast")
Food.create(name: "granola")
Food.create(name: "pancakes")
Food.create(name: "waffles")

User.all.each do |user|
  user.favorite_food_ids = (1..12).to_a.sample((1..5).to_a.sample)
end

FriendRequest.create(user_id: 1, friend_id: 2)
FriendRequest.create(user_id: 1, friend_id: 3)
FriendRequest.create(user_id: 1, friend_id: 4)
FriendRequest.create(user_id: 2, friend_id: 5)
FriendRequest.create(user_id: 4, friend_id: 3)
FriendRequest.create(user_id: 5, friend_id: 4)

Friendship.create(user_id: 1, friend_id: 5)
Friendship.create(user_id: 5, friend_id: 1)

Friendship.create(user_id: 2, friend_id: 3)
Friendship.create(user_id: 3, friend_id: 2)

Friendship.create(user_id: 2, friend_id: 4)
Friendship.create(user_id: 4, friend_id: 2)

Friendship.create(user_id: 5, friend_id: 6)
Friendship.create(user_id: 6, friend_id: 5)

User.all.each do |user|
  (rand(5)+1).times do |num|
    user.posts.create(details: Faker::Lorem.sentences(rand(5) + 1))
  end
end

Post.all.each do |post|
  (rand(3)).times do |num|
    p = post.comments.build
    p.user_id = rand(User.count) + 1
    p.details = Faker::Lorem.sentence(rand(5) + 3)
    p.save!
  end
end







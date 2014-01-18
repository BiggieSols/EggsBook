EggsBook::Application.routes.draw do
  resources :users do
    # resources :feeds, only: [:show]
    resources :posts, only: [:index]

  end

  # temp?
  ###########################################
  resources :posts, only: [:index]
  ###########################################

  get '/users/:id/photos', to: 'users#photos', as: "user_photos"
  get '/users/:id/friends', to: 'users#friends', as: "user_friends"

  get '/feed', to: 'feeds#show', as: "feed"

  post 'posts/:post_id/like', to: 'post_likes#create', as: "post_like"
  delete 'posts/:post_id/like', to: 'post_likes#destroy', as: "post_like"
  post 'comments/:comment_id/like', to: 'comment_likes#create', as: "comment_like"
  delete 'comments/:comment_id/like', to: 'comment_likes#destroy', as: "comment_like"

  resources :posts, only: [:show, :create] do
    resources :comments, only: [:create, :index]
  end

  resource :session, only: [:new, :create, :destroy]

  resources :friend_requests, only: [:create, :destroy]
  resources :friendships, only: [:create, :destroy]

  # may not need this
  resources :foods
  # resources :user_foods, only: [:create, :destroy]

  get 'about', to: 'static_pages#about'
  get 'contact', to: 'static_pages#contact'


  root to: 'feeds#show'
end

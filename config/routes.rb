EggsBook::Application.routes.draw do
  resources :users do
    # resources :feeds, only: [:show]
    resources :posts, only: [:index]

  end

  # temp?
  ###########################################
  resources :posts, only: [:index]
  resources :comments, only: [:index, :show]
  ###########################################

  get '/feed', to: 'feeds#show', as: "feed"

  post 'posts/:post_id/like', to: 'post_likes#create', as: "post_like"
  delete 'posts/:post_id/like/:id', to: 'post_likes#destroy', as: "post_like"
  post 'comments/:comment_id/like', to: 'comment_likes#create', as: "comment_like"
  delete 'comments/:comment_id/like/:id', to: 'comment_likes#destroy', as: "comment_like"

  resources :posts, only: [:show, :create] do
    resources :comments, only: [:create, :index]
  end

  resource :session, only: [:new, :create, :destroy]

  post 'users/:friend_id/friendships', to: 'friendships#create', as: "friendship"
  delete 'users/:friend_id/friendships/:id', to: 'friendships#destroy', as: "friendship"

  post 'users/:friend_id/friend_requests', to: 'friend_requests#create', as: "friend_request" 
  delete 'users/:friend_id/friend_requests/:id', to: 'friend_requests#destroy', as: "friend_request"

  # may not need this
  resources :foods
  resources :user_foods, only: [:create, :destroy, :edit, :update]

  get 'about', to: 'static_pages#about'
  get 'contact', to: 'static_pages#contact'
  get 'landing', to: 'static_pages#landing'


  # root to: 'feeds#show'
  # temp change
  root to: 'static_pages#landing'
end

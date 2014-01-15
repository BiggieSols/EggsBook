EggsBook::Application.routes.draw do
  resources :users
  resource :session, only: [:new, :create, :destroy] 
  resources :friend_requests, only: [:create, :destroy]
  resources :friendships, only: [:create, :destroy]

  get 'about', to: 'static_pages:about'
  get 'contact', to: 'static_pages:contact'
end

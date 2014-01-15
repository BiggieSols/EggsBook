EggsBook::Application.routes.draw do
  resources :users do
    resources :feeds, only: [:get]
  end
  
  resource :session, only: [:new, :create, :destroy] 

  resources :friend_requests, only: [:create, :destroy]
  resources :friendships, only: [:create, :destroy]

  
  # may not need this
  # resources :foods, only: [:create, :destroy]
  # resources :user_foods, only: [:create, :destroy]

  get 'about', to: 'static_pages:about'
  get 'contact', to: 'static_pages:contact'
end

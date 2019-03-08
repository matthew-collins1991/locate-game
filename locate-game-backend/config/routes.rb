
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :users
        resources :games
        resources :cities
        resources :regions
        post 'signin', to: 'users#signin'
      end
    end
  end


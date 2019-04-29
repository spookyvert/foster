Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create]
      post '/login', to: 'auth#create'
      get '/current_user', to: 'auth#show'
      resources :places, only: [:index, :create]
      resources :usersplaces, only: [:index, :create]

    end
  end
end

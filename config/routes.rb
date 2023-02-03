Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :users, only: [:index, :show, :create]
  post "/auth/login", to: "authentication#login"
  post "/auth/register", to: "authentication#register"
  get "/auth/user", to: "authentication#getuser"
end

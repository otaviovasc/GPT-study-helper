Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :subjects, only: [:index]
      resources :sub_subjects, only: [:index]
      resources :exercises, only: %i[index show]
      post '/chat', to: 'chat#create'
    end
  end
end

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :subjects, only: [:index]
      resources :sub_subjects, only: [:index]
      resources :exercises, only: [:index]
    end
  end
end

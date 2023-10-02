module Api
  class SubjectsController < ApplicationController
    def index
      subjects = Subject.all
      render json: subjects
    end
  end
end

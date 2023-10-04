class Api::V1::SubjectsController < ApplicationController
  def index
    subjects = Subject.all.order(:name)
    render json: subjects
  end
end

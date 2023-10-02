class Api::V1::ExercisesController < ApplicationController
  def index
    # exercises = Exercise.random_exercises(params[:sub_subject_id])
    exercises = Exercise.all
    render json: exercises
  end
end

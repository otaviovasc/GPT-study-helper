module Api
  class SubSubjectsController < ApplicationController
    def index
      sub_subjects = SubSubject.where(subject_id: params[:subject_id])
      render json: sub_subjects
    end
  end
end

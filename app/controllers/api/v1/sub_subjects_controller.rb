class Api::V1::SubSubjectsController < ApplicationController
  def index
    # sub_subjects = SubSubject.where(subject_id: params[:subject_id])
    sub_subjects = SubSubject.all
    render json: sub_subjects
  end
end

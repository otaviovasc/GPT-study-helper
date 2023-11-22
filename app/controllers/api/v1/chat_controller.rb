class Api::V1::ChatController < ApplicationController
  def create
    service = Gpt3Service.new
    reply = service.chat(params[:message])

    if reply
      render json: { reply: reply }
    else
      render json: { error: 'Unable to process your request.' }, status: :bad_request
    end
  end
end

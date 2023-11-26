require 'openai'

class Gpt3Service
  def initialize
    @client = OpenAI::Client.new(access_token: Rails.application.credentials.openai_api_key)
  end

  def chat(message)
    formatted_messages = message.map do |msg|
      { role: msg[:role] == 'user' ? 'user' : 'assistant', content: msg[:content] }
    end

    response = @client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: formatted_messages,
        max_tokens: 150,
        temperature: 0.7
    })
    p response
    response.dig("choices", 0, "message", "content") if response['choices'].present?
  rescue StandardError => e
    Rails.logger.error "Error communicating with OpenAI: #{e.message}"
    nil
  end
end

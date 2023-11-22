require 'openai'

class Gpt3Service
  def initialize
    @client = OpenAI::Client.new(access_token: Rails.application.credentials.openai_api_key)
  end

  def chat(message)
    response = @client.chat(
      parameters: {
        model: "gpt-3.5-turbo", # Required.
        messages: [{ role: "user", content: message}], # Required.
        temperature: 0.7
    })
    response.dig("choices", 0, "message", "content") if response['choices'].present?
  rescue StandardError => e
    Rails.logger.error "Error communicating with OpenAI: #{e.message}"
    nil
  end
end
#EXTINF:-1,True Justice S01 E06 http://cdn.miip.tv:80/series/ileana/ileana/6055.mkv #EXTINF:-1,True Justice S01 E07 http://cdn.miip.tv:80/series/ileana/ileana/6056.mkv #EXTINF:-1,True Justice S01 E08 http://cdn.miip.tv:80/series/ileana/ileana/6057.mp4 #EXTINF:-1,True Justice S01 E09 http://cdn.miip.tv:80/series/ileana/ileana/60

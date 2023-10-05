require 'httparty'
require 'nokogiri'

Exercise.destroy_all
SubSubject.destroy_all
Subject.destroy_all
puts "Cleaned DB"

URLS = [
  ["https://projetoagathaedu.com.br/banco-de-questoes/biologia.php", "Biologia"],
  ["https://projetoagathaedu.com.br/banco-de-questoes/matematica.php", "Matemática"],
  ["https://projetoagathaedu.com.br/banco-de-questoes/geografia-sociologia-e-filosofia.php", "Geografia, Filosofia e Sociologia"],
  ["https://projetoagathaedu.com.br/banco-de-questoes/linguagens.php", "Linguagens"],
  ["https://projetoagathaedu.com.br/banco-de-questoes/historia.php", "História"],
  ["https://projetoagathaedu.com.br/banco-de-questoes/fisica.php", "Física"],
  ["https://projetoagathaedu.com.br/banco-de-questoes/quimica.php", "Química"]
]

def extract_exercises_from_page(sub_subject, url)
    response = HTTParty.get(url)
    page = Nokogiri::HTML(response.body)

    # Check if page exists
    if page.text.include?("File not found.")
      puts "Skipping #{url} due to 'File not found.'"
      return
    end
    puts "Processing #{url}"

    # Handle edge case where the #tabela-respostas doesnt have 2 tables
    unless page.css("#gabarito #tabela-respostas")[1].nil?
      answers = page.css("#gabarito #tabela-respostas")[1].css("td").map { |td| td.text[/[A-Z]/] }
    else
      answers = page.css("#gabarito #tabela-respostas")[0].css("td").map { |td| td.text[/[A-Z]/] }
    end

    index = 0 # This index will be used to access the correct answer from the answers array for each exercise

    page.css(".questoes-enem-vestibular").each do |exercise_container|
      img_tags = [] # Array to store all the image URLs within the current exercise

      question_paragraphs = exercise_container.css("p:not(.questoes-enem-vestibular-foco):not(.direita)")
      question_text_parts = question_paragraphs.map do |paragraph|
        img = paragraph.css("img")
        if img.any?
          img_tags << img.first['data-src']
          img.remove
        end
        paragraph.inner_html.strip
      end

      question_text = question_text_parts.join("\n")

      options = exercise_container.css("ol li").map do |option_node|
        img = option_node.css("img")
        if img.any?
          img_url = img.first["data-src"]
          img_url
        else
          option_node.text.strip
        end
      end

      direita_paragraphs = exercise_container.css("p.direita").map(&:text)

      Exercise.create!(
        question: question_text,
        img_tag: img_tags,
        options: options,
        direita: direita_paragraphs,
        sub_subject: sub_subject,
        answer: answers[index]
      )

      index += 1
    end
end

URLS.each do |url, subject_name|
  # Create the subject
  subject = Subject.find_or_create_by!(name: subject_name)

  # For each URL, scrape the page to get a list of sub-subjects
  response = HTTParty.get(url)
  page = Nokogiri::HTML(response.body)
  page.css(".accordion .opcao a").each do |link|
    sub_subject_name = link.css(".lista-tema").text.strip
    relative_path = link['href']
    escaped_path = relative_path.split('/').map { |part| CGI.escape(part) }.join('/')
    sub_subject_url = URI.join(url, escaped_path).to_s

    # Skip the URL if it's one of the main subject URLs
    next if URLS.any? { |subject_url, _| subject_url == sub_subject_url }

    # Create or find the sub_subject and link it to the subject
    sub_subject = SubSubject.find_or_create_by!(name: sub_subject_name, subject: subject)

    # Extract exercises for this sub-subject
    extract_exercises_from_page(sub_subject, sub_subject_url)
  end
end

puts "Seeding done!"

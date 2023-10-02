# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

url = "https://projetoagathaedu.com.br/questoes-enem/matematica/estatistica-2.php"
unparsed_page = HTTParty.get(url)
parsed_page = Nokogiri::HTML(unparsed_page.body)

# Assume questions are in a list
questions_list = parsed_page.css('.questoes-enem-vestibular')

p questions_list.first
# questions_list.each do |question_item|
#   # Your logic to extract and save questions in the DB
#   p question_item
# end

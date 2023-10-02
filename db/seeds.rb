# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Subject.destroy_all
SubSubject.destroy_all
Exercise.destroy_all

s1 = Subject.create(name: "Matematica")
s2 = Subject.create(name: "Historia")
ss1 = SubSubject.create(name: "Aritmetica", subject: s1)
ss2 = SubSubject.create(name: "1500 brasil", subject: s2)
Exercise.create(question: "01 aritmetica louca", answer: "a", sub_subject: ss1)
Exercise.create(question: "02 aritmetica crazy", answer: "b", sub_subject: ss1)
Exercise.create(question: "01 historia maneira", answer: "a", sub_subject: ss2)
Exercise.create(question: "02 historia bacana", answer: "a", sub_subject: ss2)

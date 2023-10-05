# README

Projeto Agatha - Documentation & Setup Guide
1. Introduction
The Projeto Agatha application serves as an educational platform, enabling users to engage with a collection of quiz questions spanning various subjects and their corresponding sub-subjects. The user-friendly interface facilitates seamless navigation between subjects, provides visual aids like images, and allows for interactive answering.

2. Technical Overview
Backend
Framework: Ruby on Rails
Version: 7.0.8
Language: Ruby
Version: 3.1.2p20
Database: PostgreSQL
Initialized with the -d postgres flag during Rails app creation.
Frontend
Framework: React (developed with Vite for faster performance)
UI Framework: Ant Design
Selected for its comprehensive library of components and design aesthetics.
3. API Endpoints
Outlined in routes.rb, the available API endpoints encompass:

GET /api/v1/subjects: Retrieves an array of all subjects.
GET /api/v1/sub_subjects: Fetches sub-subjects predicated on a parent subject.
GET /api/v1/exercises: Acquires a set of exercises based on a designated sub-subject.
4. Frontend Design
The primary layout is streamlined with a parent component enveloping two significant children:

SelectionForm: Entrusted with the task of subject and subsequent sub-subject selection.
ExercisesList: Responsible for dynamically presenting exercises rooted in the chosen sub-subject, this component also manages the interactive answering mechanism.
jsx
Copy code
return (
    <div>
      <SelectionForm setSelectedSubSubject={setSelectedSubSubject} />
      <ExercisesList selectedSubSubject={selectedSubSubject} />
    </div>
);
5. Database Structure
The database is orchestrated around three primary tables:

subjects: Hosts the overarching subjects.
sub_subjects: Archives the sub-categories of subjects. Maintains a foreign key linkage with subjects.
exercises: Preserves individual exercises that are contingent on sub-subjects, encapsulating questions, respective answers, and potential illustrative images. Forges a foreign key association with sub_subjects.
Relationship dynamics:

One subject encompasses several sub-subjects.
A singular sub-subject can be linked to multiple exercises.
6. Controllers in Database
Each model is operated by a distinct controller:

Subjects Controller: Furnishes the entire array of subjects to the API.
Sub Subjects Controller: Supplies the API with all pertinent sub-subjects based on the elected subject.
Exercises Controller: Relays five randomized exercises to the API, contingent on the chosen sub-subject.
7. Data Seeding Procedure
Seeding is performed by web scraping the resource https://projetoagathaedu.com.br/. The process encompasses:

Subjects: New subjects are instantiated from predefined URLs.
Sub Subjects: Each subject sees the creation of new sub-subjects.
Exercises: Every sub-subject is populated with exercises, ensuring distinct parsing for images, related question references, and answer choices. Notably, some answers can be pictorial.
8. Error Management
Throughout development, several challenges were encountered and resolved:

Web scraping anomalies, especially when processing pages exhibiting non-uniform content.
Managing invalid URLs, specifically those containing non-ASCII characters.
Addressing scenarios wherein the page returns a "File not found" response.
Navigating React rendering intricacies, particularly when dealing with fluctuating content types.
9. Future Enhancements
Interactive Question Answering: Subsequent iterations will see improved user interactivity, where answers will be validated in real-time, providing immediate feedback.
10. Setup Instructions
Before setting up the project, ensure your system is compatible with the following prerequisites:

Operating System: macOS, Ubuntu, Windows (with WSL)
Web Browser: Google Chrome, Mozilla Firefox
Step-by-Step Guide
Install Ruby
macOS:
bash
Copy code
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install rbenv
rbenv install 3.1.2
rbenv global 3.1.2
Ubuntu:
bash
Copy code
sudo apt-get update
sudo apt-get install git curl libssl-dev libreadline-dev zlib1g-dev
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin

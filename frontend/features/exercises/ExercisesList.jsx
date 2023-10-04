import React, { useState, useEffect } from 'react';
import { API_URL } from "../../constants";
import './ExercisesList.css';

const ExercisesList = ({ selectedSubSubject }) => {
  const [exercises, setExercises] = useState([]);
  const [answerVisibility, setAnswerVisibility] = useState({});

  useEffect(() => {
    console.log("selected sub subject:")
    console.log(selectedSubSubject);
    if (selectedSubSubject) {
      async function loadExercises() {
        const response = await fetch(`${API_URL}/exercises?sub_subject_id=${selectedSubSubject}`);
        if (response.ok) {
          const json = await response.json();
          setExercises(json);

          const initialAnswerVisibility = {};
          json.forEach((exercise) => {
            initialAnswerVisibility[exercise.id] = false;
          });
          setAnswerVisibility(initialAnswerVisibility);
        }
      }
      loadExercises();
    }
  }, [selectedSubSubject]);

  const toggleAnswerVisibility = (exerciseId) => {
    setAnswerVisibility((prevState) => ({
      ...prevState,
      [exerciseId]: !prevState[exerciseId],
    }));
  };

  function processQuestionText(text) {
    const BREAK_LIMIT = 40;
    let charCounter = 0;
    const elements = [];
    let currentSentence = "";

    text.split("").forEach((char, idx) => {
      currentSentence += char;
      charCounter++;

      // If we hit a breakpoint condition
      if (
        (char === "." || char === "?") &&
        charCounter > BREAK_LIMIT
      ) {
        elements.push(<span key={idx}>{currentSentence}<br/><br/></span>);
        currentSentence = "";
        charCounter = 0;
      }
    });

    // Add remaining part
    if (currentSentence) {
      elements.push(<span key="last">{currentSentence}</span>);
    }

    return elements;
  }

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id} className="exercise-container">
          <h2>{processQuestionText(exercise.question)}</h2>

          {/* Render images from img_tag */}
          {exercise.img_tag && exercise.img_tag.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="Exercise illustration" />
          ))}

          {/* Render direita text */}
          {exercise.direita && exercise.direita.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}

          {/* Render options */}
          <ul>
            {exercise.options && exercise.options.map((option, idx) => {
              const isImage = option.startsWith("http");
              const optionLetter = String.fromCharCode(65 + idx); // 65 is ASCII for 'A'
              return (
                <h3 key={idx}>
                  {optionLetter}. {isImage ? <img src={option} alt={`Option ${optionLetter}`} /> : option}
                </h3>
              );
            })}
          </ul>

          <button onClick={() => toggleAnswerVisibility(exercise.id)}>
            {answerVisibility[exercise.id] ? "Esconder Resposta" : "Mostrar Resposta"}
          </button>

          {answerVisibility[exercise.id] && <h4>{exercise.answer}</h4>}
        </div>
      ))}
    </div>
  );
};

export default ExercisesList;

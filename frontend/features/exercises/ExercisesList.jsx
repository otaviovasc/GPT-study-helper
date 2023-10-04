import React, { useState, useEffect } from 'react';
import { API_URL } from "../../constants";

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

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.question}</h2>
          <button onClick={() => toggleAnswerVisibility(exercise.id)}>
            {answerVisibility[exercise.id] ? "Esconder Resposta" : "Mostrar Resposta"}
          </button>
          {answerVisibility[exercise.id] && <p>{exercise.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default ExercisesList;

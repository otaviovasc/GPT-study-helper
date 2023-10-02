import React, { useState, useEffect } from 'react'
import { API_URL } from "../../constants"

function ExercisesList() {
  const [exercises, setExercises] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [answerVisibility, setAnswerVisibility] = useState({}); // State to track answer visibility

  useEffect(() => {
    async function loadExercises() {
      try {
        const response = await fetch(`${API_URL}/exercises`);
        if (response.ok) {
          const json = await response.json();
          setExercises(json);

          // Initialize answer visibility state
          const initialAnswerVisibility = {};
          json.forEach((exercise) => {
            initialAnswerVisibility[exercise.id] = false;
          });
          setAnswerVisibility(initialAnswerVisibility);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred.");
        console.log("An error occurred:", e);
      } finally {
        setLoading(false);
      }
    }
    loadExercises();
  }, []);

  // Function to toggle answer visibility for a specific exercise
  const toggleAnswerVisibility = (exerciseId) => {
    setAnswerVisibility((prevState) => ({
      ...prevState,
      [exerciseId]: !prevState[exerciseId],
    }));
  };

  return (
    <>
      <div>
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-container">
            <h2>{exercise.question}</h2>
            <button onClick={() => toggleAnswerVisibility(exercise.id)}>
              {answerVisibility[exercise.id] ? "Hide Answer" : "Show Answer"}
            </button>
            {answerVisibility[exercise.id] && <p>{exercise.answer}</p>}
          </div>
        ))}
      </div>
    </>
  );
}

export default ExercisesList;

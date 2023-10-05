import { useState, useEffect } from 'react';
import './ExercisesList.css';
import { API_URL } from "../../constants";
import Options from './Options';
import PropTypes from 'prop-types';

// Component responsible for displaying the list of exercises.
const ExercisesList = ({ selectedSubSubject }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
      // Fetch exercises based on selected sub-subject
      if (selectedSubSubject) {
          const loadExercises = async () => {
              const response = await fetch(`${API_URL}/exercises?sub_subject_id=${selectedSubSubject}`);
              if (response.ok) {
                  const json = await response.json();
                  setExercises(json);
              }
          };

          loadExercises();
      }
  }, [selectedSubSubject]);

  // Processes question text for better display
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
        elements.push(<span key={idx}>{currentSentence}<br/></span>);
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
          <h3>{processQuestionText(exercise.question)}</h3>

          {/* Render images from img_tag */}
          {exercise.img_tag && exercise.img_tag.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="Exercise illustration" />
          ))}

          {/* Render direita text */}
          {exercise.direita && exercise.direita.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}

          {/* Render options */}
          <Options options={exercise.options} correctAnswer={exercise.answer} />
        </div>
      ))}
    </div>
  );
};

ExercisesList.propTypes = {
  selectedSubSubject: PropTypes.number
};
ExercisesList.defaultProps = {
  selectedSubSubject: null
};

export default ExercisesList;

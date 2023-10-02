import { useState } from 'react';
import './App.css';
import ExercisesList from '/features/exercises/ExercisesList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <h1>Projeto Agatha Edu</h1>
        <p>Encontre questões de qualquer materia!</p>
        <ExercisesList />
      </div>
    </>
  )
}

export default App

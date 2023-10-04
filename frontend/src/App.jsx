import { BrowserRouter as Router } from "react-router-dom"
import { useState } from 'react';
import './App.css';
import AppRoutes from '/features/routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className="app">
          <h1>Projeto Agatha Edu</h1>
          <p>Encontre questões de qualquer materia!</p>
          <AppRoutes />
        </div>
      </Router>
    </>
  )
}

export default App

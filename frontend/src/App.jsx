// Organized imports
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import AppRoutes from '/features/routes/AppRoutes';

// Main App component
function App() {
  return (
    <Router>
      <div className="app">
        <h1>Projeto Agatha Edu</h1>
        <p>Encontre questões de qualquer materia!</p>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

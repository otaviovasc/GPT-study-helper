// Organized imports
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import AppRoutes from '/features/routes/AppRoutes';

// Main App component
function App() {

  return (
    <Router>
      <div className="app">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

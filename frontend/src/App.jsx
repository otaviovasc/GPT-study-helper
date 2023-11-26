// Organized imports
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import AppRoutes from '/features/routes/AppRoutes';
import ChatComponent from "../features/chats/ChatComponent";

// Main App component
function App() {

  return (
    <Router>
      <div className="app">
        <AppRoutes />
        <ChatComponent />
      </div>
    </Router>
  );
}

export default App;

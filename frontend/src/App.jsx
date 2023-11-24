// Organized imports
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import AppRoutes from '/features/routes/AppRoutes';
import ChatWindow from '/features/chats/ChatWindow';
import ChatIcon from '/features/chats/ChatIcon';

// Main App component
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <h1>Projeto Agatha Edu</h1>
        <AppRoutes />
        <ChatIcon onClick={() => setIsChatOpen(true)} />
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;

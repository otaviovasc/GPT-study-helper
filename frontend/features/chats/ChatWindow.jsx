import './ChatWindow.css';
import ChatComponent from './ChatComponent';

const ChatWindow = ({ onClose }) => {
  return (
    <div className="chat-window">
      <button onClick={onClose}>Close</button>
      <ChatComponent />
    </div>
  );
};

export default ChatWindow;

import { useState } from 'react';
import { Button, Input } from 'antd';
import { FaBookReader, FaWindowMinimize, FaTimes } from 'react-icons/fa';
import Draggable from 'react-draggable';
import { API_URL } from "../../constants";
import './ChatComponent.css';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeDrags, setActiveDrags] = useState(0);

  const onStart = () => {
    setActiveDrags(prevActiveDrags => prevActiveDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(prevActiveDrags => prevActiveDrags - 1);
  };

  const dragHandlers = { onStart, onStop };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleClose = () => {
    toggleMinimize()
    setChatHistory([])
  }

  const sendMessage = async () => {
    if (!message) return;

    const updatedChatHistory = [...chatHistory, { role: 'user', content: message }];
    setChatHistory(updatedChatHistory);

    // Send the updated chat history to the Rails server
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedChatHistory })
    });

    const data = await response.json();

    // Add server response to chat history
    if (data.reply) {
      setChatHistory(currentChatHistory => [
        ...currentChatHistory,
        { role: 'assistant', content: data.reply }
      ]);
    }

    // Clear the input field
    setMessage('');
  };


  return (
    <Draggable handle=".handle" {...dragHandlers}>
      <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
        {!isMinimized ? (
          <>
            <div className="chat-header handle">
              <FaBookReader className="chat-icon" />
              <div className="header-actions">
                <Button onClick={toggleMinimize} type="link" className="action-button">
                  <FaWindowMinimize />
                </Button>
                <Button onClick={toggleClose} type="link" className="action-button">
                  <FaTimes />
                </Button>
              </div>
            </div>
            <div className="chat-conversation">
              {chatHistory.map((chat, index) => (
                <p key={index} className={`chat-message ${chat.role === 'user' ? 'user' : 'bot'}`}>
                  {chat.content}
                </p>
              ))}
            </div>
            <div className="chat-input-container">
              <Input
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={sendMessage}
                placeholder="Type a message..."
              />
              <Button onClick={sendMessage} className="send-button">Send</Button>
            </div>
          </>
        ) : (
          <div className="minimized-icon handle">
            <FaBookReader onClick={toggleMinimize} />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ChatComponent;

import { useState } from 'react';
import { Button, Input } from 'antd';
import { API_URL } from "../../constants";
import './ChatComponent.css';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);

    // Send the message to the Rails server
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    setChatHistory(currentChatHistory => [
      ...currentChatHistory,
      { sender: 'bot', text: data.reply || 'Error from server or no reply' }
    ]);

    // Clear the input field
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-conversation">
        {chatHistory.map((chat, index) => (
          <p key={index} className="chat-message">
            <strong>{chat.sender === 'user' ? 'You: ' : 'Bot: '}</strong> {chat.text}
          </p>
        ))}
      </div>
      <div className="chat-input-container">
        <Input
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatComponent;

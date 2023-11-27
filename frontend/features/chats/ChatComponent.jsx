import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import ChatHeader from './ChatHeader';
import ChatConversation from './ChatConversation';
import ChatInput from './ChatInput';
import MinimizedIcon from './MinimizedIcon';
import { API_URL } from "../../constants";
import PropTypes from 'prop-types';
import './ChatComponent.css';

const ChatComponent = ({ chatContext }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(chatContext);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    setChatHistory(chatContext);
  }, [chatContext]);


  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleClose = () => {
    setIsMinimized(true)
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
    <Draggable handle=".handle">
      <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
        {!isMinimized ? (
          <>
            <ChatHeader onMinimize={toggleMinimize} onClose={toggleClose} />
            <ChatConversation chatHistory={chatHistory} />
            <ChatInput message={message} setMessage={setMessage} onSend={sendMessage} />
          </>
        ) : (
          <MinimizedIcon onClick={toggleMinimize} />
        )}
      </div>
    </Draggable>
  );
};

ChatComponent.propTypes = {
  chatContext: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

ChatComponent.defaultProps = {
  chatContext: [],
};

export default ChatComponent;

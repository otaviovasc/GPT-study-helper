import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import ChatHeader from './ChatHeader';
import ChatConversation from './ChatConversation';
import ChatInput from './ChatInput';
import MinimizedIcon from './MinimizedIcon';
import { API_URL } from "../../constants";
import PropTypes from 'prop-types';
import './ChatComponent.css';

const ChatComponent = ({ chatHistory, aiContext, isMinimized, setIsMinimized }) => {
  const [message, setMessage] = useState('');
  const [chatRecord, setChatRecord] = useState([]);

  useEffect(() => {
    setChatRecord(chatHistory);
  }, [chatHistory]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleClose = () => {
    setIsMinimized(true);
    setChatRecord([]);
  };

  const sendMessage = async () => {
    if (!message) return;

    const updatedChatRecord = [...chatRecord, { role: 'user', content: message }];
    setChatRecord(updatedChatRecord);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedChatRecord, context: aiContext })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.reply) {
        setChatRecord(currentChatRecord => [
          ...currentChatRecord,
          { role: 'assistant', content: data.reply }
        ]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle the error (e.g., show an error message to the user)
    }

    setMessage('');
  };

  return (
    <Draggable handle=".handle">
      <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
        {!isMinimized ? (
          <>
            <ChatHeader onMinimize={toggleMinimize} onClose={toggleClose} />
            <ChatConversation chatHistory={chatRecord} />
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
  chatHistory: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  aiContext: PropTypes.string,
  isMinimized: PropTypes.bool.isRequired,
  setIsMinimized: PropTypes.func.isRequired,
};

export default ChatComponent;

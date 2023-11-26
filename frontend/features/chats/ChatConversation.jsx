import PropTypes from 'prop-types';
import React from 'react';


const ChatMessage = ({ text, role }) => {
  // Split the text by newline characters and render each line separately
  const messageLines = text.split('\n').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <p className={`chat-message ${role === 'user' ? 'user' : 'bot'}`}>
      {messageLines}
    </p>
  );
};

const ChatConversation = ({ chatHistory }) => (
  <div className="chat-conversation">
    {chatHistory.map((chat, index) => (
      <ChatMessage key={index} text={chat.content} role={chat.role} />
    ))}
  </div>
);

// Validations
ChatConversation.propTypes = {
  chatHistory: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
};

export default ChatConversation;

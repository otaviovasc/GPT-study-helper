import { Button, Input } from 'antd';
import PropTypes from 'prop-types';

const ChatInput = ({ message, setMessage, onSend }) => (
  <div className="chat-input-container">
    <Input
      className="chat-input"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onPressEnter={onSend}
      placeholder="Type a message..."
      aria-label="Type a message"
    />
    <Button onClick={onSend} className="send-button" aria-label="Send Message">Send</Button>
  </div>
);

// Validations
ChatInput.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default ChatInput;

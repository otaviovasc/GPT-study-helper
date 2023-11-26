import { Button } from 'antd';
import { FaBookReader, FaWindowMinimize, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ChatHeader = ({ onMinimize, onClose }) => (
  <div className="chat-header handle">
    <FaBookReader className="chat-icon" />
    <h3>AI Teacher</h3>
    <div className="header-actions">
    <Button onClick={onMinimize} type="link" className="action-button" aria-label="Minimize Chat">
      <FaWindowMinimize />
    </Button>
    <Button onClick={onClose} type="link" className="action-button" aria-label="Close Chat">
      <FaTimes />
    </Button>
    </div>
  </div>
);

ChatHeader.propTypes = {
  onMinimize: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatHeader;

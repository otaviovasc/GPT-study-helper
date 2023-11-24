import { FaComments } from 'react-icons/fa'; // Importing chat icon from react-icons
import './ChatIcon.css';

const ChatIcon = ({ onClick }) => {
  return (
    <div className="chat-icon" onClick={onClick}>
      <FaComments size={30} />
    </div>
  );
};

export default ChatIcon;

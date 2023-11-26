import PropTypes from 'prop-types';
import { FaBookReader } from 'react-icons/fa';

const MinimizedIcon = ({ onClick }) => (
  <div className="minimized-icon handle">
    <FaBookReader onClick={onClick} />
  </div>
);

// Validations
MinimizedIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MinimizedIcon;

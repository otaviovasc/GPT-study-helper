import { useState } from 'react';
import { Radio, message } from 'antd';
import './Options.css';
import PropTypes from 'prop-types';

const Options = ({ options, correctAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = e => {
        const chosenOption = e.target.value;
        setSelectedOption(chosenOption);

        if (chosenOption === correctAnswer) {
            message.success('Correct answer!');
        } else {
            message.error('Incorrect answer.');
        }
    };

    return (
      <div className="options-container">
        <Radio.Group onChange={handleOptionSelect} value={selectedOption}>
            {options && options.map((option, idx) => {
                const isImage = option.startsWith("http");
                const optionLetter = String.fromCharCode(65 + idx); // 65 is ASCII for 'A'

                return (
                    <Radio
                        key={idx}
                        value={optionLetter}
                        className="option"
                    >
                        {optionLetter}. {isImage ? <img src={option} alt={`Option ${optionLetter}`} /> : option}
                    </Radio>
                );
            })}
        </Radio.Group>
      </div>
    );
};

Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  ).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  onOptionSelected: PropTypes.func.isRequired
};


export default Options;

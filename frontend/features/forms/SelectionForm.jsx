import { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import styles from './SelectionForm.module.css';
import { API_URL } from "../../constants";
import PropTypes from 'prop-types';

const { Option } = Select;

// Component responsible for rendering subject and sub-subject selection forms.
const SelectionForm = ({ setSelectedSubSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    // Fetch list of subjects on component mount
    fetch(`${API_URL}/subjects`)
      .then(response => response.json())
      .then(data => setSubjects(data));
  }, []);

  // Handles change in subject selection and fetches related sub-subjects
  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    fetch(`${API_URL}/sub_subjects?subject_id=${value}`)
      .then(response => response.json())
      .then(data => setSubSubjects(data));
  };

  return (
    <div className={styles.formContainer}>
      <Form layout="vertical">
        <Form.Item className={styles.formItem}>
          <Select
            size="large"
            placeholder="Selecione uma Matéria"
            onChange={handleSubjectChange}
            allowClear
          >
            {subjects.map((subject) => (
              <Option key={subject.id} value={subject.id}>
                {subject.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className={styles.formItem}>
          <Select
            id="sub_subject"
            size="large"
            placeholder="Selecione uma Sub-Matéria"
            disabled={!selectedSubject}
            onChange={value => setSelectedSubSubject(value)}
            allowClear
          >
            {subSubjects.map((subSubject) => (
              <Option key={subSubject.id} value={subSubject.id}>
                {subSubject.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

SelectionForm.propTypes = {
  setSelectedSubSubject: PropTypes.func.isRequired
};
export default SelectionForm;

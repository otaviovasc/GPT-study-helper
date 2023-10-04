import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import { API_URL } from "../../constants";
import styles from './SelectionForm.module.css';

const { Option } = Select;

const SelectionForm = ({ setSelectedSubSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/subjects`)
      .then(response => response.json())
      .then(data => setSubjects(data));
  }, []);

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

export default SelectionForm;

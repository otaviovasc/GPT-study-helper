import React, { useState } from 'react';
import SelectionForm from './forms/SelectionForm';
import ExercisesList from './exercises/ExercisesList';

const ParentComponent = () => {
  const [selectedSubSubject, setSelectedSubSubject] = useState(null);

  return (
    <div>
      <SelectionForm setSelectedSubSubject={setSelectedSubSubject} />
      <ExercisesList selectedSubSubject={selectedSubSubject} />
    </div>
  );
};

export default ParentComponent;

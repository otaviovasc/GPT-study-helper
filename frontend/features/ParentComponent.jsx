import { useState } from 'react';
import SelectionForm from './forms/SelectionForm';
import ExercisesList from './exercises/ExercisesList';

// Main parent component that manage the child components
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

import { useState } from 'react';
import SelectionForm from './forms/SelectionForm';
import ExercisesList from './exercises/ExercisesList';
import ChatComponent from './chats/ChatComponent';


// Main parent component that manage the child components
const ParentComponent = () => {
  const [selectedSubSubject, setSelectedSubSubject] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const handleTeacherHelpClick = (exerciseContext) => {
    setChatHistory([])
    const newMessage = { role: 'system', content: `Ajude-me a chegar na resposta e raciocinio para essa questao:\n${exerciseContext}` };
    setChatHistory(currentChatHistory => [...currentChatHistory, newMessage]);
  };

  return (
    <div>
      <SelectionForm setSelectedSubSubject={setSelectedSubSubject} />
      <ExercisesList selectedSubSubject={selectedSubSubject} onTeacherHelpClick={handleTeacherHelpClick} />
      <ChatComponent chatContext={chatHistory} />
    </div>
  );
};

export default ParentComponent;

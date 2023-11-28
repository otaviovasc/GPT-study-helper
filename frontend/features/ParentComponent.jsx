import { useState } from 'react';
import SelectionForm from './forms/SelectionForm';
import ExercisesList from './exercises/ExercisesList';
import ChatComponent from './chats/ChatComponent';


// route "/"
const ParentComponent = () => {
  const [selectedSubSubject, setSelectedSubSubject] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [aiContext, setAiContext] = useState('');  // New state for AI context
  const [isChatMinimized, setIsChatMinimized] = useState(true);

  // Clear chat history and give context
  const handleTeacherHelpClick = (exercise) => {

    const initialMessage = {
      role: 'assistant',
      content: `Sure, I will help you with this "*${exercise.question.substring(0, 24)}...*" exercise, what are your questions?`
    };

    setAiContext(`Be short and offer guidance not answers, help the user with this exercise as a teacher: ${exercise.question} - options:${exercise.options}`);
    setIsChatMinimized(false); // Open the chat window
    setChatHistory([initialMessage])
  };

  return (
    <div>
      <SelectionForm setSelectedSubSubject={setSelectedSubSubject} />
      <ExercisesList selectedSubSubject={selectedSubSubject} onTeacherHelpClick={handleTeacherHelpClick} />
      <ChatComponent
        chatHistory={chatHistory}
        aiContext={aiContext}
        isMinimized={isChatMinimized}
        setIsMinimized={setIsChatMinimized}
      />
    </div>
  );
};

export default ParentComponent;

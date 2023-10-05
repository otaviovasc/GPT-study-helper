// Routes for the application
import { Route, Routes } from 'react-router-dom';
import ParentComponent from '/features/ParentComponent';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ParentComponent />} />
    </Routes>
  );
}

export default AppRoutes;

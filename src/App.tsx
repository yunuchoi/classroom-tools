import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClockTimetablePage from './pages/ClockTimetablePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clock-timetable" element={<ClockTimetablePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

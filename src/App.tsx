import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClockTimetablePage from './pages/ClockTimetablePage';
import { Analytics } from '@vercel/analytics/next';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clock-timetable" element={<ClockTimetablePage />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckInForm from './Pages/CheckInForm.jsx';
import LuggageDetails from './Pages/LuggageDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckInForm />} />
        <Route path="/luggage" element={<LuggageDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

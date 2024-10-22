import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckInForm from './Pages/CheckInForm.jsx';
import LuggageDetails from './Pages/LuggageDetails.jsx';
import BoardingPass from './Pages/BoardingPass.jsx';
import GatesPage from './Pages/GatesPage.jsx';
import GateDetails from './Pages/GateDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckInForm />} />
        <Route path="/luggage" element={<LuggageDetails />} />
        <Route path="/boardingpass" element={<BoardingPass />}/>
        <Route path="/gates" element={<GatesPage />}/>
        <Route path="/GateDetails" element={<GateDetails />}/>
      </Routes>
    </Router>
  );
}

export default App;

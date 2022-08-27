import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Addbook from "./pages/Addbook";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route path="addBook" element={<Addbook />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import ISS from "./components/ISS";
import Calendar from "./components/Calender";
import Bookmarked from "./components/Bookmarked";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/iss" element={<ISS />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

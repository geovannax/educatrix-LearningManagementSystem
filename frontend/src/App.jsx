import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/layout/ToastContainer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Activity from "./pages/Activity";

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          <Route path="/Activity" element={<Activity />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </ToastProvider>
  );
}

export default App;

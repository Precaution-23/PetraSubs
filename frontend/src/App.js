import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import MobileSubscribers from "./pages/MobileSubscribers";

function App() {
  return (
    <div>
         <Router>
        <Routes>
        <Route path="/" element={<Header pages={<Homepage /> }  />}  />
        <Route path="/subscribe" element={<Header pages={<MobileSubscribers /> }  />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

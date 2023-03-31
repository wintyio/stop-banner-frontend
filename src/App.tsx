import React from "react";
import { NavermapsProvider } from "react-naver-maps";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import FeedPage from "./Pages/FeedPage";
import LoginPage from "./Pages/LoginPage";
import ReportPage from "./Pages/ReportPage";

function App() {
  return (
    <div id="App">
      <NavermapsProvider ncpClientId="4wpduqcu60">
        <HashRouter>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </HashRouter>
      </NavermapsProvider>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NicknameScreen from "./telas/NicknameScreen";
import ColorMixerScreen from "./telas/ColorMixerScreen";
import BoardScreen from "./telas/BoardScreen";
import RankingScreen from "./telas/RankingScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NicknameScreen />} />
        <Route path="/colormixer" element={<ColorMixerScreen />} />
        <Route path="/board" element={<BoardScreen />} />
        <Route path="/ranking" element={<RankingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
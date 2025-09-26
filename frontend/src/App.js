import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ColorMixerScreen from "./telas/ColorMixerScreen";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/colormixer" element={<ColorMixerScreen />} />

      </Routes>
    </Router>
  );
}

export default App;
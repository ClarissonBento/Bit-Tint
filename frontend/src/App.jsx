import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fase1Screen from "./telas/Fase1Screen";
import Fase2Screen from "./telas/Fase2Screen";
import Fase3Screen from "./telas/Fase3Screen";
import HomeScreen from "./telas/HomeScreen";
import RegistrationScreen from "./telas/RegistrationScreen";
import LoginScreen from './telas/LoginScreen';
import CadastroScreen from './telas/CadastroScreen';
import TurmaScreen from "./telas/TurmaScreen";
import CriarTurmaScreen from "./telas/CriarTurmaScreen";
import GalleryRankingScreen from './telas/GalleryRankingScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Registro" element={<RegistrationScreen />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/cadastro" element={<CadastroScreen />} />
        <Route path="/turma" element={<TurmaScreen />} />
        <Route path="/galeria-ranking" element={<GalleryRankingScreen />} />
        <Route path="/criarturma" element={<CriarTurmaScreen />} />
        <Route path="/Fase1_ColorMixer" element={<Fase1Screen />} />
        <Route path="/Fase2_ColorMixer" element={<Fase2Screen />} />
        <Route path="/Fase3_ColorMixer" element={<Fase3Screen />} />
      </Routes>
    </Router>
  );
}

export default App;
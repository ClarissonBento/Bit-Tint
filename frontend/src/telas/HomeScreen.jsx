//Tela Inicial
/*Essa tela é a tela inicial do jogo, e encaminha o 
usuario a proxima tela ao clicar em jogar */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css'; 
import backgroundImage from '../assets/tela_inicial_completa.png'; 

function HomeScreen() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/Registro'); 
  };

  return (
    <div 
      className="home-screen-container" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button onClick={handleStartGame} className="start-button">
        <span className="button-text">JOGAR</span>
      </button>

    </div>
  );
}

export default HomeScreen;

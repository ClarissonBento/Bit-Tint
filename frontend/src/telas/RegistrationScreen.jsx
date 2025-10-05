//Tela de Registro
/* Esse é o codigo da tela que possui os 3 botões após clicar em jogar
na tela inicial. Ela possui os caminhos que cada botão leva. */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './RegistrationScreen.css';
import brickWallImage from '../assets/pop_up_completa.png'; 

function RegistrationScreen() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log(`Navegando para: ${path}`);
    navigate(path);
  };

  return (
    <div 
      className="registration-screen-container" 
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      <button className="reg-button reg-button-login" onClick={() => handleNavigation('/login')}>
        <span className="reg-button-text">Login</span>
      </button>

      <button className="reg-button reg-button-turma" onClick={() => handleNavigation('/turma')}>
        <span className="reg-button-text">Turma</span>
      </button>
      
      <button className="reg-button reg-button-alunos" onClick={() => handleNavigation('/cadastro')}>
        <span className="reg-button-text">Inscrição</span>
      </button>
    </div>
  );
}

export default RegistrationScreen;

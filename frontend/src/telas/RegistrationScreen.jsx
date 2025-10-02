import React from 'react';
import { useNavigate } from 'react-router-dom';

import './RegistrationScreen.css';
// Importa a sua arte completa da tela
import backgroundImage from '../assets/pop_up_completa.png'; 

function RegistrationScreen() {
  const navigate = useNavigate();

  // Funções para cada botão (por enquanto, apenas mostram no console)
  const handleNavigation = (path) => {
    console.log(`Navegando para: ${path}`);
    // No futuro, ative a linha abaixo:
    // navigate(path);
  };

  return (
    <div 
      className="registration-screen-container" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Os botões são posicionados via CSS para se alinharem com a imagem de fundo */}
      <button className="registration-button button-inscricao" onClick={() => handleNavigation('/inscricao-form')}>
        <span className="button-text">Inscrição</span>
      </button>

      <button className="registration-button button-turma" onClick={() => handleNavigation('/turmas')}>
        <span className="button-text">Turma</span>
      </button>
      
      <button className="registration-button button-alunos" onClick={() => handleNavigation('/alunos')}>
        <span className="button-text">Alunos</span>
      </button>
    </div>
  );
}

export default RegistrationScreen;
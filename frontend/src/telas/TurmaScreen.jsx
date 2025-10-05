//Tela de Turma
/*Esse codigo é responsavel pela tela após clicar em turma,
ele possui o caminho para os dois botões (criar turma e ver 
galeria-raking) */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TurmaScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/pop_up_turma.png';

function TurmaScreen() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleCriarTurma = () => {
    console.log("Navegando para Criar Turma...");
    navigate('/criarturma'); 
  };

  const handleRankingTurmas = () => {
    navigate('/galeria-ranking'); 
  };

  return (
    <div 
      className="turma-screen-background" 
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      <button onClick={handleGoBack} className="turma-back-button" />

      <div 
        className="turma-modal-container" 
        style={{ backgroundImage: `url(${modalImage})` }}
      >
        <button className="turma-button button-criar" onClick={handleCriarTurma}>
          <span className="turma-button-text">
            criar turma
          </span>
        </button>

        <button className="turma-button button-ranking" onClick={handleRankingTurmas}>
          <span className="turma-button-text">
            galeria / ranking<br/>das turmas
          </span>
        </button>
      </div>
    </div>
  );
}

export default TurmaScreen;
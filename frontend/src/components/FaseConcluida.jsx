//FaseConcluida
/*Esse componente foi criado apenas para verificar se o código 
codigo consegue concluir a primeira parte e avançar para a parte 
de colorir as cores*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import concluidoImage from '../assets/images/concluido_cor_LAB.png';
import './FaseConcluida.css'; // Vamos criar um CSS para esta tela

function FaseConcluida() {
  const navigate = useNavigate();

  const handleNext = () => {
    // Leva para a tela de ranking ou para a próxima fase
    navigate('/ranking'); 
  };

  return (
    <div className="fase-concluida-container">
      <img 
        src={concluidoImage} 
        alt="Fase Concluída" 
        className="concluido-imagem"
        onClick={handleNext} // Permite clicar na imagem para avançar
      />
      <p className="concluido-texto">Clique para continuar</p>
    </div>
  );
}

export default FaseConcluida;

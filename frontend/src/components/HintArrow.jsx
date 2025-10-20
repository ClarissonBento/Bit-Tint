//Seta de Dica
/*Esse componente é responsável pela dica caso o 
jogador esteja demorando a achar a cor certa a ser misturada.*/

import React from 'react';

import arrowImage from '../assets/seta_destaque.png';
// Este componente renderiza a seta de dica.
function HintArrow({ direction }) {
  // Se não houver direção, não mostra nada.
  if (!direction) {
    return null;
  }

  // Define a classe CSS com base na direção ('left' ou 'right').
  const imgClass = `hint-arrow-img hint-arrow-img-${direction}`;

   return (
    // 1. Este contêiner externo cuidará da animação de pulsação
    <div className="hint-arrow-container">
      {/* 2. A imagem interna cuidará da rotação */}
      <img src={arrowImage} alt={`Dica para mover para ${direction}`} className={imgClass} />
    </div>
  );
}

export default HintArrow;
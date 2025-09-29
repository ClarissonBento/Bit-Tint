//Seta de Dica
/*Esse componente é responsável pela dica caso o 
jogador esteja demorando a achar a cor certa a ser misturada.*/

import React from 'react';

// Este componente renderiza a seta de dica.
function HintArrow({ direction }) {
  // Se não houver direção, não mostra nada.
  if (!direction) {
    return null;
  }

  // Define a classe CSS com base na direção ('left' ou 'right').
  const arrowClass = `hint-arrow hint-arrow-${direction}`;

  return (
    <div className={arrowClass}></div>
  );
}

export default HintArrow;
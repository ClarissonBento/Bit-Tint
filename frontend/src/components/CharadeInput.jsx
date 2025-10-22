import React, { useRef, useEffect } from 'react';

// Este componente cria o display de traços e letras
function CharadeInput({ correctAnswer, currentInput, onInputChange, isDisabled }) {
  const inputRef = useRef(null);

  // Efeito para manter o campo invisível focado, para que o jogador possa sempre digitar
  useEffect(() => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  }, [isDisabled]);

  // Permite que o jogador clique em qualquer lugar da área para focar o campo
  const handleContainerClick = () => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  };
  
  // Controla o que acontece quando o jogador digita
  const handleChange = (e) => {
    // Força as letras para maiúsculo e limita o tamanho ao da resposta
    onInputChange(e.target.value.toUpperCase().slice(0, correctAnswer.length));
  };

  return (
    <div className="charade-input-container" onClick={handleContainerClick}>
      {/* O campo de input de verdade, mas totalmente invisível */}
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleChange}
        className="hidden-input"
        disabled={isDisabled}
        autoComplete="off"
        spellCheck="false"
      />
      
      {/* A parte visual que o jogador vê */}
      <div className="charade-visual-display">
        {correctAnswer.split('').map((char, index) => (
          <div key={index} className="char-container">
            <span className="char-typed">
              {/* Mostra a letra que o jogador digitou ou um espaço vazio */}
              {currentInput[index] || ''}
            </span>
            <span className="char-underscore">
              {/* Mostra um traço para letras e nada para espaços */}
              {char === ' ' ? '' : '_'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharadeInput;
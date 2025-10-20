//Mascote Tutorial
//Esse componente é responsavel pela imagem do LilTint e as falas dele.

import React, { useState } from 'react';
import mascotImage from '../assets/mascote_rosto_conversando.png';
import speechBubbleImage from '../assets/borda.png';

function MascotTutorial({ dialogues, onTutorialEnd }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const handleNextDialogue = () => {
    const nextIndex = dialogueIndex + 1;
    if (nextIndex < dialogues.length) {
      setDialogueIndex(nextIndex);
    } else {
      onTutorialEnd();
    }
  };

  return (
    <div className="tutorial-overlay" onClick={handleNextDialogue}>
      <img src={mascotImage} alt="Mascote" className="mascot-image" />
      <div className="speech-bubble" style={{ backgroundImage: `url(${speechBubbleImage})` }}>
        {/* --- MUDANÇA AQUI --- */}
        {/* Adicionamos uma div extra para controlar o posicionamento do texto */}
        <div className="speech-bubble-text">
          <p>{dialogues[dialogueIndex]}</p>
        </div>
      </div>
    </div>
  );
}

export default MascotTutorial;
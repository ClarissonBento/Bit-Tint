import React, { useState, useEffect } from 'react';
import ColoringUI from '../components/ColoringUI';
import { useColoringGame } from '../hooks/useColoringGame';
import useGameScreen from '../hooks/useGameScreen'; // 1. Importa o Hook do menu

const MOCK_FASE_1_DATA = {
  tamanhoMatriz: [15, 15],
  textoCharada: "Quando algo estranho acontece, começa a reunião. Quem é o suspeito? Preste bastante atenção! Que jogo eu sou?",
  respostaCharada: "Among Us",
  cores: [
    { nome: 'Azul', r: 0, g: 0, b: 255 },
    { nome: 'Verde', r: 0, g: 255, b: 0 },
    { nome: 'Rosa Magenta', r: 255, g: 0, b: 255 }
  ],
  matrizCorreta: [
     ...Array(3).fill(Array(15).fill(null)),
     [null,null,null,0,0,0,0,null,null,null,null,null,null,null,null],
     [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
     [null,null,2,2,2,2,null,null,null,null,null,null,null,null,null],
     ...Array(8).fill(Array(15).fill(null)),
  ]
};

function ColoringPhase1Screen() {
  const [phaseData, setPhaseData] = useState(null);

  // 2. Usa o Hook para obter a lógica e o componente do menu
  const { handleMenuClick, MenuComponent } = useGameScreen();

  useEffect(() => {
    setPhaseData(MOCK_FASE_1_DATA);
  }, []);
  
  const gameLogic = useColoringGame(phaseData);

  if (!phaseData) {
    return <div>Carregando fase 1...</div>;
  }
  
  return (
    <>
      {/* 3. Renderiza o componente do menu que vem do Hook */}
      {MenuComponent}

      {/* 4. Passa a função onMenuClick para o componente da interface */}
      <ColoringUI {...gameLogic} onMenuClick={handleMenuClick} />
    </>
  );
}

export default ColoringPhase1Screen;

